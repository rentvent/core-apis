import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function getlandlordByName(event, context, callback) {

  const params = {
    TableName: 'rv_landlord',
    FilterExpression: "contains(L_Full_Name,:Fname)",
    ExpressionAttributeValues: {
      ":Fname": event.pathParameters.Fname.toUpperCase()
    }
  };
  try {
    const result = await dynamoDbLib.call("scan", params);
    let count = 0;
    for (let itemdata of result.Items) {

      const L_ReviewsParams = {
        TableName: 'Landlord_Reviews',
        FilterExpression: "LP_L_ID = :l_ID",
        ExpressionAttributeValues: {
          ":l_ID": itemdata.landlord_id
        }
      };

      const LandlordReview = await dynamoDbLib.call("scan", L_ReviewsParams);
      result.Items[count].Landlord_Reviews = LandlordReview.Items;
      console.log(result.Items[count].Landlord_Reviews)
      count++;
    };
    callback(null, success(result));
  } catch (e) {
    callback(null, failure(e));
  }
}

export async function getlandlordByAddress(event, context, callback) {

  const params = {
    TableName: 'rv_landlord',
    FilterExpression: "contains(L_Full_Name,:Fname)",
    ExpressionAttributeValues: {
      ":Fname": event.pathParameters.Fname.toUpperCase()
    }
  };
  try {
    const result = await dynamoDbLib.call("scan", params);
    let count = 0;
    for (let itemdata of result.Items) {

      const L_ReviewsParams = {
        TableName: 'Landlord_Reviews',
        FilterExpression: "LP_L_ID = :l_ID",
        ExpressionAttributeValues: {
          ":l_ID": itemdata.landlord_id
        }
      };

      const LandlordReview = await dynamoDbLib.call("scan", L_ReviewsParams);
      result.Items[count].Landlord_Reviews = LandlordReview.Items;
      console.log(result.Items[count].Landlord_Reviews)
      count++;
    };
    callback(null, success(result));
  } catch (e) {
    callback(null, failure(e));
  }
}


