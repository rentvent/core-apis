import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function getQuestionnaire (event,context,callback){

  var search_val =decodeURI(event.pathParameters.search_val);
  if(event.pathParameters.search_by == 'Q_Zipcode')
    search_val = parseInt(event.pathParameters.search_val)
   
  const params = { 
    TableName: 'Questionnaire',
    FilterExpression: "#searh_by = :search_val",
    ExpressionAttributeNames: {
      "#searh_by": event.pathParameters.search_by,
    },
    ExpressionAttributeValues:{
      ":search_val": search_val
    }
  };

  try{
    const result = await dynamoDbLib.call("scan", params);
    callback(null, success(result));
  }catch(e){
    callback(null, failure(e));
  }
}