import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";


export async function getproperty(event, context, callback) {
  const params = {
    TableName: 'rv_property',
    KeyConditionExpression: "P_ID = :p_id",
    
    ExpressionAttributeValues: {
            ":p_id":parseInt(event.pathParameters.p_id,10)
          }    
  };
  try {
    const result = await dynamoDbLib.call("query", params);
    callback(null, success(result));
  } catch (e) {
    callback(null, failure(e));
  }
}
