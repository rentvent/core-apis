import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'rentvent.cue7vrfncc1o.us-east-1.rds.amazonaws.com',
    user     : 'rentvent',
    password : 'rentvent',
    database: 'rentvent'
});

export async function getpropertyById(event, context, callback) {
  const params = {
    TableName: 'rv_property',
    KeyConditionExpression: "P_ID = :p_id",
    
    ExpressionAttributeValues: {
            ":p_id":event.pathParameters.p_id
          }    
  };
  try {
    const result = await dynamoDbLib.call("query", params);
    callback(null, success(result));
  } catch (e) {
    callback(null, failure(e));
  }
}

export async function getpropertyByAdddressDaynamo(event, context, callback) {
  const params = {
    TableName: 'rv_property',
    FilterExpression: "contains(P_Address_Line1,:address)",
    ExpressionAttributeValues: {
            ":address":event.pathParameters.address
          }    
  };
  try {
    const result = await dynamoDbLib.call("scan", params);
    callback(null, success(result));
  } catch (e) {
    callback(null, failure(e));
  }
}

export async function getpropertyByAdddressRDS(event, context, callback) {

   var p_address= decodeURI(event.pathParameters.p_address).toUpperCase();

    try {
    var  resultlist = []; var i=0 ;
    connection.query("SELECT * FROM Property where  P_Address_Line1 != ' ' and P_Address_Line1 like '%"+p_address+"%' LIMIT 50",
        function(err, rows) {

            while (i < rows.length)
            {
                resultlist.push(
                    {   'P_ID':  rows[i].P_ID,
                        'P_Address_Line1': rows[i].P_Address_Line1,
                        'P_Zipcode':rows[i].P_Zipcode,
                        'P_City':rows[i].P_City,
                        'P_County':rows[0].P_County
                    });
                i++;
            }
            callback(null, success(resultlist));
        });

    } catch (e) {
        callback(null, failure(e));
    }
}