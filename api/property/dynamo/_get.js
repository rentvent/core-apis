import * as dynamoDbLib from "../../../libs/dynamodb-lib";
import { success, failure } from "../../../libs/response-lib";

export async function getpropertyByAdddressDaynamo(event, context, callback) {

    var p_address = decodeURI(event.pathParameters.p_address).toUpperCase();
    const result = [];
    var params = {
        TableName: 'rv_property',
        FilterExpression: "contains(P_Address_Line1,:address)",
        ExpressionAttributeValues: {
            ":address": p_address
        }
    };
    try {
        const result = await dynamoDbLib.call("scan", params);

        callback(null, success(result));

    } catch (e) {
        callback(null, failure(e));
    }
}

export async function getpropertyById(event, context, callback) {
    const params = {
        TableName: 'rv_property',
        KeyConditionExpression: "P_ID = :p_id",

        ExpressionAttributeValues: {
            ":p_id": event.pathParameters.p_id
        }
    };

    var  propertyparams = {
        TableName: 'Property_Reviews',
        FilterExpression: "P_ID = :p_id",
        ExpressionAttributeValues: {
            ":p_id": event.pathParameters.p_id
        }
    };


    try {
        const result = await dynamoDbLib.call("query", params);

        if(result.Count > 0 )
        {
            var Review = await dynamoDbLib.call("scan", propertyparams);
            var  p_approval = 0 ; var p_rating=0; var v_approval ;
            if(Review.Count>0) {
                var reviewList = [];
                for (let item of Review.Items) {
                var reviewResponse = {

                   "T_City" : '' ,
                        "T_State" : '' ,
                        "PR_Title" :'',
                        "PR_Description": item.PR_Description,
                        "PR_Created_Date" : item.PR_Created_Date


                }

                //compute step
                    v_approval = item.PR_Approval == 'yes' ? 1 : 0;


                   //Sum of value
                    p_rating = p_rating + item.PR_Rating ;
                    p_approval = p_approval +v_approval ;

                   // console.log(item);
                    reviewList.push(reviewResponse)
            }

                //compute  Avg
                var p_avgApproval =p_approval/Review.Count;
                var p_avgRating =p_rating /Review.Count;


                result.Items[0].P_Reviews = reviewList ;
                result.Items[0].P_Approval_Rate = p_avgApproval;
                result.Items[0].P_Avg_Rating = p_avgRating ;
            }
        }else
            callback(success("Not Found"));


        callback(null, success(result));
    } catch (e) {
        callback(null, failure(e));
    }
}