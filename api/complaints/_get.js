import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";


export async function getComplaints (event,context,callback){
  const params = { 
    TableName: 'Complaints',
    KeyConditionExpression: "C_ID = :c_id",
    ExpressionAttributeValues:{
      ":c_id":parseInt(event.pathParameters.c_id,10)
    }
  };

  try{
    const result = await dynamoDbLib.call("query", params);
    callback(null, success(result));
  }catch(e){
    callback(null, failure(e));
  }
}
