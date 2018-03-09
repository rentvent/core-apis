import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";


export async function getrental(event, context, callback) {
  const params = {
    TableName: 'rv_rental',
    KeyConditionExpression: "R_ID = :r_id",
    
    ExpressionAttributeValues: {
            ":r_id":event.pathParameters.r_id
          }    
  };
  try {
    const result = await dynamoDbLib.call("query", params);
    callback(null, success(result));
  } catch (e) {
    callback(null, failure(e));
  }
}
