import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function getlandlord(event, context, callback) {
  const params = {
    TableName: 'rv_landlord',
    FilterExpression: "L_First_Name = :fname AND L_Last_Name= :lname",
    ExpressionAttributeValues: {
            ":fname":event.pathParameters.first_name.toLowerCase(),
            ":lname": event.pathParameters.last_name.toLowerCase()
          }    
  };
  try {
    const result = await dynamoDbLib.call("scan", params);
    callback(null, success(result));
  } catch (e) {
    callback(null, failure(e));
  }
}


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


export async function getQuestionnaire (event,context,callback){
  const params = { 
    TableName: 'Questionnaire',
    KeyConditionExpression: "Q_ID = :q_id",
    ExpressionAttributeValues:{
      ":q_id":parseInt(event.pathParameters.q_id,10)
    }
  };

  try{
    const result = await dynamoDbLib.call("query", params);
    callback(null, success(result));
  }catch(e){
    callback(null, failure(e));
  }
}


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
