import * as dynamoDbLib from "../../../libs/dynamodb-lib";
import { success, failure } from "../../../libs/response-lib";
import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-1" });
var p_result; var l_result;

export async function getpropertyById(event, context, callback) {
    const params = {
        TableName: 'rv_property',
        KeyConditionExpression: "P_ID = :p_id",
        ExpressionAttributeValues: {
            ":p_id": event.pathParameters.p_id
        }
    };
    try {
        console.log("p_result");
        // first step get property by ID from daynmo 
        p_result = await dynamoDbLib.call("query", params);

        console.log(p_result.Count);
        if (p_result.Count < 1) {
            callback(null, success("Not Found"));
            return;
        }
        await getPropertyReview(event.pathParameters.p_id);

        await getlandlord(event.pathParameters.p_id);

        await getcomplaints(p_result.Items[0].P_Address_Line1);

        callback(null, success(p_result));
    } catch (e) {
        callback(null, failure(e));
    }
}

async function getPropertyReview(p_id) {
    console.log("getPropertyReview begin !!!!")
    var propertyparams = {
        TableName: 'Property_Reviews',
        FilterExpression: "P_ID = :p_id",
        ExpressionAttributeValues: {
            ":p_id": p_id
        }
    };

    try {
        var Review = await dynamoDbLib.call("scan", propertyparams);
        console.log("Review data ", Review);
        var p_approval = 0; var p_rating = 0; var v_approval;
        if (Review.Count > 0) {
            console.log("We have reviews for this property good news :D ");
            var reviewList = [];
            for (let item of Review.Items) {

                var Tenant;
                if (item.PR_T_ID != null) {
                    var TenantParams = {
                        TableName: 'Tenant',
                        FilterExpression: "T_ID = :t_id",
                        ExpressionAttributeValues: {
                            ":t_id": item.PR_T_ID
                        }
                    };
                    Tenant = await dynamoDbLib.call("scan", TenantParams);
                    console.log("Tenent Data ", Tenant);
                }
                var p_rental = await getRental(item.PR_ID);
                console.log("p_rental", p_rental);
                var reviewResponse = {
                    "T_City": '', //Tenant != null ? Tenant.Items[0].T_City : ' ',
                    "T_State": '',//Tenant != null ? Tenant.Items[0].T_State : ' ',
                    "PR_Types": item.PR_Types,
                    "PR_Created_Date": item.PR_Created_Date,
                    "PR_Condition": item.PR_Condition,
                    "PR_Approval": item.PR_Approval,
                    "PR_Rating": item.PR_Rating,
                    "PR_Renatl": p_rental
                }

                //compute step
                v_approval = item.PR_Approval == 'yes' ? 1 : 0;
                //Sum of value
                p_rating = p_rating + item.PR_Rating;
                p_approval = p_approval + v_approval;
                // console.log(item);
                reviewList.push(reviewResponse)
            }
            p_result.Items[0].P_Reviews = reviewList;
            p_result.Items[0].P_Approval_Rate = p_approval + '/' + Review.Count;
            p_result.Items[0].P_Avg_Rating = isNaN(p_rating / Review.Count) ? 0 : Math.trunc(p_rating / Review.Count);
        }
        console.log("getPropertyReview ended successfully !!!!")
    }
    catch (err) {
        return err;
    }

}

async function getlandlord(p_id) {
    console.log("getlandlord begin!!!! ");
    console.log(p_id);
    var csd = new AWS.CloudSearchDomain({
        endpoint: 'doc-landlord-hbh2pd23kqbxmavfajjklhhume.us-east-1.cloudsearch.amazonaws.com',
        apiVersion: '2013-01-01'
    });
    var params = {
        query: p_id,
        queryOptions: "{'fields':['l_properties']}"
    };
    var listOfObject = [];
    var P_Landlords = []
        ; try {
            var data = await csd.search(params).promise();
            console.log(data);
            var i = 0;

            while (i < data.hits.hit.length) {
                var obj = JSON.parse(JSON.stringify(data.hits.hit[i].fields).replace(/[\[\]']+/g, ''));
                listOfObject.push(obj);
                i++;
            }
            console.log(listOfObject);

            for (let v_landlord of listOfObject) {
                var p_land;
                const l_params = {
                    TableName: 'Landlord',
                    KeyConditionExpression: "L_ID = :l_id",
                    ExpressionAttributeValues: {
                        ":l_id": v_landlord.l_id
                    }
                };
                console.log(v_landlord.l_id);
                //get landlord data
                l_result = await dynamoDbLib.call("query", l_params);
                console.log("First Step ", l_result);


                console.log("second Step get Landlord Review");
                var landlordReviews = await getlandlordReviews(v_landlord.l_id);

                p_land = l_result.Items[0];
                p_land.Landlord_Reviews = landlordReviews != undefined ? landlordReviews.Landlord_Reviews : [];
                p_land.L_Response_Rate = landlordReviews != undefined ? landlordReviews.L_Response_Rate : 0;
                p_land.L_Avg_Rating = landlordReviews != undefined ? landlordReviews.L_Avg_Rating : 0;
                p_land.L_Approval_Rate = landlordReviews != undefined ? landlordReviews.L_Approval_Rate : 0;
                p_land.LR_Repair_Requests = landlordReviews != undefined ? landlordReviews.LR_Repair_Requests : 0;

                P_Landlords.push(p_land);

            }
            p_result.Items[0].P_Landlords = P_Landlords;
            console.log("getlandlord ended successfully!!!! ");

        }
    catch (err) {
        console.log(err, err.stack); // an error occurred
        return err;
    }
}
async function getlandlordReviews(l_id) {

    console.log("getlandlordReviews begin !!!")
    var L_Avg_Rating = 0;
    var L_Approval_Rate = 0;
    var LR_Repair_Requests = 0;
    var L_Response_Rate = 0;
    var L_Recommended_Rate = 0;
    const L_ReviewsParams = {
        TableName: 'Landlord_Reviews',
        FilterExpression: "LP_L_ID = :l_ID",
        ExpressionAttributeValues: {
            ":l_ID": l_id
        }
    };

    try {
        var Review = await dynamoDbLib.call("scan", L_ReviewsParams);

        var l_recommended = 0, l_approval = 0;
        var ReviewResponseList = [];

        //Compute AVG
        if (Review.Count > 0) {

            console.log("compute step");

            for (let item of Review.Items) {

                console.log("compute step2 ", item);
                //het the value of each reviw
                l_recommended = item.LR_Recommend;
                l_approval = item.LR_Approval;

                //Convert the value of YES OR NO
                l_recommended = l_recommended == 'yes' ? 1 : 0;
                l_approval = l_approval == 'yes' ? 1 : 0;
                console.log("compute step3 ", l_recommended);
                //YES oR NO
                L_Approval_Rate = L_Approval_Rate + l_approval;
                L_Recommended_Rate = L_Recommended_Rate + l_recommended;
                console.log("compute step4 ", L_Approval_Rate);
                //Computation
                L_Response_Rate = L_Response_Rate + item.LR_Responsiveness;
                L_Avg_Rating = L_Avg_Rating + item.LR_Rating;
                LR_Repair_Requests = LR_Repair_Requests + item.LR_Repair_Requests;
                console.log("compute step5 ", L_Avg_Rating);

                // in order to get the city and state
                var Tenant;
                console.log(item.LR_T_ID);
                if (item.LR_T_ID != null) {
                    var TenantParams = {
                        TableName: 'Tenant',
                        KeyConditionExpression: "T_ID = :t_id",
                        ExpressionAttributeValues: {
                            ":t_id": item.LR_T_ID
                        }
                    };
                    Tenant = await dynamoDbLib.call("query", TenantParams);
                    console.log("Tenent Data ", Tenant);
                }
                //prepare review Response
                //console.log(item);
                var ReviewResponse = {
                    'LR_Title': item.LR_Title != null ? item.LR_Title : '',
                    'LR_Types': item.LR_Types != null ? item.LR_Types : '',
                    'LR_Created_Date': item.LR_Created_On != null ? item.LR_Created_On : '',
                    'LR_Rating': item.LR_Rating != null ? item.LR_Created_On : '',
                    'LR_Responsiveness': item.LR_Responsiveness,
                    'LR_Repair_Requests': item.LR_Repair_Requests,
                    'LR_Approval': item.LR_Approval,
                    'T_City': Tenant.Count > 0 ? Tenant.Items[0].T_City : ' ',
                    'T_State': Tenant.Count > 0 ? Tenant.Items[0].T_State : ' '
                };

                console.log(ReviewResponse);
                ReviewResponseList = ReviewResponseList.concat(ReviewResponse);
            }
            console.log("done loop");

            var v_reponse = new Object();

            v_reponse.Landlord_Reviews = ReviewResponseList.length > 0 ? ReviewResponseList : [];
            console.log(v_reponse.Landlord_Reviews);
            v_reponse.L_Response_Rate = isNaN(L_Response_Rate / Review.Count) ? 0 : L_Response_Rate / Review.Count;
            v_reponse.L_Avg_Rating = isNaN(L_Avg_Rating / Review.Count) ? 0 : L_Avg_Rating / Review.Count;
            v_reponse.L_Approval_Rate = isNaN(l_approval / Review.Count) ? 0 : l_approval / Review.Count;
            v_reponse.LR_Repair_Requests = isNaN(LR_Repair_Requests / Review.Count) ? 0 : LR_Repair_Requests / Review.Count;
            // set the avg variable
            console.log(v_reponse);
        }
        console.log("getlandlordReviews ended successfully !!!")
        return v_reponse;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

async function getcomplaints(p_address) {

    console.log("getcomplaintsObj begin!!!! ");
    console.log(p_address);
    var csd = new AWS.CloudSearchDomain({
        endpoint: 'search-complaints-fpo6pfj3dowxfbboyfllktyb4q.us-east-1.cloudsearch.amazonaws.com',
        apiVersion: '2013-01-01'
    });
    var params = {
        query: p_address,
        queryOptions: "{'fields':['c_address_line1']}"
    };
    var listOfObject = [];
    try {
        var data = await csd.search(params).promise();
        console.log(data);
        var i = 0;

        while (i < data.hits.hit.length) {
            var obj = JSON.parse(JSON.stringify(data.hits.hit[i].fields).replace(/[\[\]']+/g, ''));
            listOfObject.push(obj);
            i++;
        }
        console.log(listOfObject);

        var p_complaints = [];
        for (let comp of listOfObject) {
            console.log(comp.c_id);
            p_complaints.push(comp.c_id);
        }

        p_result.Items[0].P_Complaints = p_complaints;

        console.log("getcomplaintsObj ended successfully!!!! ");
    }
    catch (err) {
        console.log(err, err.stack); // an error occurred
        return err;
    }
}

async function getRental(pr_id) {
    console.log("getRental begin !!!!")
    const P_Rental_Param = {
        TableName: 'rv_rental',
        FilterExpression: "PR_ID = :PR_ID",
        ExpressionAttributeValues: {
            ":PR_ID": pr_id
        }
    };

    try {

        var Rental = await dynamoDbLib.call("scan", P_Rental_Param);
        let rentals = [];

        if (Rental.Count > 0) {

            for (let r of Rental.Items) {
                rentals.push({ "R_ID": r.rental_id })
            }
        }
        console.log("getRental ended successfully !!!!")
        return rentals;
    }

    catch (err) {
        console.log(err);
        return err;
    }
}