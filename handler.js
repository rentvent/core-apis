import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function get(event, context, callback) {
  const params = {
    TableName: 'rv_landlord',
    FilterExpression: "L_First_Name = :fname AND L_Last_Name= :lname",
    ExpressionAttributeValues: {
            ":fname":event.pathParameters.first_name.toLowerCase(),
            ":lname": event.pathParameters.last_name.toLowerCase()
          }    
  };
  console.log(params.ExpressionAttributeValues);
  try {
    const result = await dynamoDbLib.call("scan", params);
    callback(null, success(result));
  } catch (e) {
    callback(null, failure(e));
  }
}