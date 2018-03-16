import * as dynamoDbLib from "../../../libs/dynamodb-lib";
import { success, failure } from "../../../libs/response-lib";
import * as similarity from "../../../libs/similarity-lib";
import AWS from "aws-sdk";
import _ from "underscore";
AWS.config.update({ region: "us-east-1" });
// global varible for get landlord detailes 
var l_result;

export async function getlandlordInfo(event, context, callback) {
    console.log("getlandlordInfonew begin !!!");

    const params = {
        TableName: 'Landlord',
        KeyConditionExpression: "L_ID = :l_id",
        ExpressionAttributeValues: {
            ":l_id": event.pathParameters.l_id
        }
    };
    try {

        //get landlord data
        l_result = await dynamoDbLib.call("query", params);
        console.log("First Step ", l_result);

        if (l_result.Count <= 0) {
            callback(null, success("Not Found"));
            return;
        }
        console.log("second Step get Landlord Review");
        await getlandlordReviews(event.pathParameters.l_id);

        console.log("third Step get Landlord prperties");
        await getProperties();

        callback(null, success(l_result.Items[0]));
    } catch (e) {
        callback(null, failure(e));
    }
}

export async function getlandlordReviews(l_id) {

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


                //Convert the value of YES OR NO
                l_recommended = l_recommended == 'yes' ? 1 : 0;

                console.log("compute step3 ", l_recommended);
                //YES oR NO

                L_Recommended_Rate = L_Recommended_Rate + l_recommended;
                console.log("compute step4 ", L_Approval_Rate);
                //Computation
                L_Response_Rate = L_Response_Rate + item.LR_Responsiveness;
                L_Avg_Rating = L_Avg_Rating + item.LR_Rating;
                LR_Repair_Requests = LR_Repair_Requests + item.LR_Repair_Requests;
                console.log("compute step5", L_Avg_Rating);

                // in order to get the city and state
                console.log("call Tenanat Table");
                var Tenant;
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
                var ReviewResponse = {
                    'LR_Title': item.LR_Title,
                    'LR_Types': item.LR_Types,
                    'LR_Created_Date': item.LR_Created_On,
                    'LR_Rating': item.LR_Rating,
                    'LR_Responsiveness': item.LR_Responsiveness,
                    'LR_Repair_Requests': item.LR_Repair_Requests != null ? item.LR_Repair_Requests : '',
                    'LR_Approval': item.LR_Approval,
                    'T_City': Tenant != null ? Tenant.Items[0].T_City : ' ',
                    'T_State': Tenant != null ? Tenant.Items[0].T_State : ' '
                };
                ReviewResponseList = ReviewResponseList.concat(ReviewResponse);
            }
        }
        console.log("ReviewResponseList", ReviewResponseList.length);

        l_result.Items[0].Landlord_Reviews = ReviewResponseList.length > 0 ? ReviewResponseList : [];


        // set the avg variable
        l_result.Items[0].L_Response_Rate = isNaN(L_Response_Rate / Review.Count) ? 0 : L_Response_Rate / Review.Count;
        l_result.Items[0].L_Avg_Rating = isNaN(L_Avg_Rating / Review.Count) ? 0 : L_Avg_Rating / Review.Count;
        l_result.Items[0].L_Approval_Rate = isNaN(L_Recommended_Rate / Review.Count) ? 0 : L_Recommended_Rate / Review.Count;
        l_result.Items[0].LR_Repair_Requests = isNaN(LR_Repair_Requests / Review.Count) ? 0 : LR_Repair_Requests / Review.Count;

        console.log("getlandlordReviews ended successfully !!!")

    }
    catch (err) {
        return err;
    }
}

export async function getProperties() {
    console.log("getProperties begin !!!!");
    try {
        console
        //as l_properties as a string we need to convert it to json
        var L_Properties = []; var L_Complaints = [];
        //If this landlord has property

        console.log("l_result.Items[0].L_Properties ", l_result.Items[0].L_Properties);
        if (l_result.Items[0].L_Properties != null) {
            console.log("yes we have prop ");
            //set the value of L_prop to valid Json Object
            var ss = l_result.Items[0].L_Properties;

            //replace the Attribute name with double qoutes
            var newstr = ss.replace(new RegExp('p_id', 'g'), '"p_id"');

            // parse the string to json
            var v_properties = JSON.parse(newstr);

            console.log("property count", v_properties.length);
            console.log("The property array " + v_properties);

            var propertysize = v_properties.length;
            if (propertysize > 0) {

                for (let prop of v_properties) {
                    console.log("prop", prop);
                    const L_PropertiesParams = {
                        TableName: 'rv_property',
                        KeyConditionExpression: "P_ID = :p_id",
                        ExpressionAttributeValues: {
                            ":p_id": prop.p_id.toString()
                        }
                    };
                    console.log(prop.p_id.toString());
                    var properties = await dynamoDbLib.call("query", L_PropertiesParams);

                    console.log("GET property data ", properties);

                    // do we have data for this properties ? ?
                    if (properties.Count > 0) {

                        var item = properties.Items[0];
                        console.log("item.P_Address_Line1", item.P_Address_Line1);

                        console.log("forth Step get  prperties complaints");

                        var complaints = [];
                        var p_add;
                        if (item.P_Address_Line1 != undefined)
                            p_add = item.P_Address_Line1
                        else
                            p_add = l_result.Items[0].L_Address_Line1 + ' ' + l_result.Items[0].L_Address_Line2;

                        complaints = await getcomplaints(p_add);
                        console.log("complaints", complaints);

                        if (complaints.length > 0) {

                            //to get unique value
                            var uniques = _.map(_.groupBy(complaints, function (doc) {
                                return doc.c_id;
                            }), function (grouped) {
                                return grouped[0];
                            });

                            console.log("we have complains for this property ");
                            for (let comp of uniques) {
                  
                                var similarityPercentage = await similarity.checksimilarity(p_add, comp.c_address_line1);
                                console.log("test",similarityPercentage);
                                if (similarityPercentage > 0.6) {
                                    //build the object
                                    var complaintsObj = {
                                        'C_ID': comp.c_id,
                                        //'similarty': similarityPercentage,
                                        //'address': comp.c_address_line1,
                                        //'case number': comp.c_case_number
                                    };
                                    L_Complaints.push(complaintsObj);
                                }
                            }
                        }

                        //get property review 
                        console.log("fifth Step get  prperties reviews", item.P_ID);
                        var propertiesReview = await getproprtyReview(item.P_ID)

                        // prepare property response
                        var propResponse = {
                            'P_ID': properties.Items[0].P_ID,
                            'P_Photos': properties.Items[0].P_Photos,
                            'P_Address_Line1': properties.Items[0].P_Address_Line1,
                            'P_Address_Line2': properties.Items[0].P_Address_Line2,
                            'P_City': properties.Items[0].P_City,
                            'P_Zipcode': properties.Items[0].P_Zipcode,
                            'P_State': properties.Items[0].P_State,
                            'PR_Rating': propertiesReview.Count > 0 ? propertiesReview.avgReview : 0,
                            'PR_Count': propertiesReview.Count > 0 ? propertiesReview.Count : 0,
                            'P_Complaints': complaints.length > 0 ? L_Complaints : []
                        };
                        console.log("propResponse", propResponse);

                        L_Properties = L_Properties.concat(propResponse);
                    }
                }
            }
            l_result.Items[0].L_Properties = propertysize > 0 ? L_Properties : [];
        }
    }
    catch (err) {
        return err;
    }
}

export async function getcomplaints(p_address) {

    console.log("getcomplaintsObj begin!!!! ");
    console.log(p_address);
    var csd = new AWS.CloudSearchDomain({
        endpoint: 'search-complaints-fpo6pfj3dowxfbboyfllktyb4q.us-east-1.cloudsearch.amazonaws.com',
        apiVersion: '2013-01-01'
    });
    var params = {
        query: p_address,
        queryOptions: "{'fields':['c_address_line1'],'defaultOperator':'or'}"
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
        console.log("getcomplaintsObj ended successfully!!!! ");
        return listOfObject;
    }
    catch (err) {
        console.log(err, err.stack); // an error occurred
        return err;
    }
}

export async function getproprtyReview(p_id) {
    try {
        console.log("getproprtyReview begin !!!");
        // get property review param from table
        var PropertiesReviewParams = {
            TableName: 'Property_Reviews',
            FilterExpression: "P_ID = :p_id",
            ExpressionAttributeValues: {
                ":p_id": p_id
            }
        };
        var propertiesReview = await dynamoDbLib.call("scan", PropertiesReviewParams);
        var sum_prop_avg = 0
        if (propertiesReview.Count > 0) {
            console.log("we have data  propertiesReview", propertiesReview.Items);

            //compute the avg rating for property
            console.log("before loop");
            for (let pr_reveiw of propertiesReview.Items) {
                console.log("inside loop");
                sum_prop_avg += pr_reveiw.PR_Rating
            }
        }
        var avgReview = isNaN(sum_prop_avg / propertiesReview.Count) ? 0 : sum_prop_avg / propertiesReview.Count;

        console.log("getproprtyReview ended successfully!!!! ", avgReview);
        return { 'avgReview': avgReview, 'Count': propertiesReview.Count };
    }
    catch (err) {
        return err;
    }
}


