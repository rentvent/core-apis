import * as dynamoDbLib from "../../../libs/dynamodb-lib";
import { success, failure } from "../../../libs/response-lib";


export async function getComplaints (event,context,callback){
  console.log("helllo");
  const params = { 
    TableName: 'Complaints',
    KeyConditionExpression: "C_ID = :c_id",
    ExpressionAttributeValues:{
      ":c_id":event.pathParameters.c_id
    }
  };
    console .log(event.pathParameters.c_id);
  try{
   
    const result = await dynamoDbLib.call("query", params);

    callback(null, success(result));
  }catch(e){
    console.log(e);
    callback(null, failure(e));
  }
}
