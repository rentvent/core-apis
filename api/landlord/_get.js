import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function getlandlordByName(event, context, callback) {

  const params = {
    TableName: 'rv_landlord',
    FilterExpression: "contains(L_Full_Name,:Fname)",
    ExpressionAttributeValues: {
      ":Fname": event.pathParameters.Fname.toUpperCase()
    },
    Limit: 1000,
  };
  try {
    const result = await dynamoDbLib.call("scan", params);
    let count = 0;
    for (let itemdata of result.Items) {

      const L_ReviewsParams = {
        TableName: 'Landlord_Reviews',
        FilterExpression: "LP_L_ID = :l_ID",
        ExpressionAttributeValues: {
          ":l_ID": itemdata.L_ID
        }
      };

      const LandlordReview = await dynamoDbLib.call("scan", L_ReviewsParams);
      result.Items[count].Landlord_Reviews = LandlordReview.Items;
      count++;
    };
    callback(null, success(result));
  } catch (e) {
    callback(null, failure(e));
  }
}


export async function getlandlordInfo(event, context, callback) {
  
  var L_Avg_Rating = 0;
  var L_Approval_Rate = 0;
  var L_Repair_Requests = 0;
  var L_Response_Rate = 0;
  const params = {
    TableName: 'rv_landlord',
    KeyConditionExpression: "L_ID = :l_id",
    ExpressionAttributeValues: {
      ":l_id": event.pathParameters.l_id
    }
  };
  const L_ReviewsParams = {
    TableName: 'Landlord_Reviews',
    FilterExpression: "LP_L_ID = :l_ID",
    ExpressionAttributeValues: {
      ":l_ID": event.pathParameters.l_id
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    //console.log(result);

    const Review = await dynamoDbLib.call("scan", L_ReviewsParams);

    //console.log(Review);

    //Compute AVG 
    if (Review.Count >= 1) {
      for (let item of Review.Items) {

        item.LR_Responsiveness = item.LR_Responsiveness == 'yes' ? 1 : 0;
        item.LR_Approval = item.LR_Responsiveness == 'yes' ? 1 : 0;

        L_Response_Rate = L_Response_Rate + item.LR_Responsiveness;
        L_Approval_Rate = L_Approval_Rate + item.LR_Approval;

        L_Avg_Rating = L_Avg_Rating + item.LR_Rating;
        L_Repair_Requests = L_Repair_Requests + item.LR_Repair_Requests;
      }

      result.Items[0].Landlord_Reviews = Review.Items;
    }

    result.Items[0].L_Response_Rate = L_Response_Rate / Review.Count;
    result.Items[0].L_Avg_Rating = L_Avg_Rating / Review.Count;
    result.Items[0].L_Approval_Rate = L_Approval_Rate / Review.Count;
    result.Items[0].L_Repair_Requests = L_Repair_Requests / Review.Count;

    //console.log(result.Items[0].L_Properties);

    var str = result.Items[0].L_Properties;
    var newstr = str.replace(new RegExp( 'p_id', 'g'), '"p_id"');
    //console.log(newstr);

    var jsonObj = JSON.parse(newstr);
 
    var count = 0 ; var L_Properties = [];
    while(count < Object.keys(jsonObj).length)
     {
      const L_PropertiesParams = {
        TableName: 'rv_property',
        FilterExpression: "P_ID = :p_id",
        ExpressionAttributeValues: {
          ":p_id": jsonObj[count].p_id
        }
      };
      const properties = await dynamoDbLib.call("scan", L_PropertiesParams);
      
      if(properties.Count > 0)
      {
        L_Properties = L_Properties.concat(properties.Items);
      }
      count++;
      }

    result.Items[0].L_Properties = L_Properties;

    callback(null, success(result));
  } catch (e) {
    callback(null, failure(e));
  }
}
