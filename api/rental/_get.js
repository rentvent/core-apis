import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";


export async function getrental(event, context, callback) {
  const params = {
    TableName: 'rv_rental',
    KeyConditionExpression: "rental_id = :r_id",
    
    ExpressionAttributeValues: {
            ":r_id":parseInt(event.pathParameters.r_id,10)
          }    
  };
  try {
    const result = await dynamoDbLib.call("query", params);
    callback(null, success(result));
  } catch (e) {
    callback(null, failure(e));
  }
}
