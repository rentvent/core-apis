import { success, failure } from "../../../libs/response-lib";
import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-1" });

export async function getLandlordSearch(event, context, callback) {
  try {
    var p_name = decodeURIComponent(decodeURIComponent(event["pathParameters"]["p_name"]));
    var params = {
      query: p_name,
      queryOptions : "{'fields':['l_full_name']}" 
    }
    var result = await GetLandlord(params);
    callback(null, success(result));
  }
  catch (err) {
    callback(null, failure(err));
  }
}

export async function getLandlordbyProperty(event, context, callback) {
  var p_address = decodeURIComponent(decodeURIComponent(event["pathParameters"]["lp_address"]));
  try {
    var params = {
      query: p_address,
      queryOptions : "{'fields':['p_address']}" 
    }
    var result = await GetLandlord(params);
    callback(null, success(result));
  }
  catch (err) {
    callback(null, failure(err));
  }
}

async function GetLandlord(p_params) {
  console.log("GetLandlord begin !!!!!")
  var csd = new AWS.CloudSearchDomain({
    endpoint: 'search-landlord-hbh2pd23kqbxmavfajjklhhume.us-east-1.cloudsearch.amazonaws.com',
    apiVersion: '2013-01-01'
  });
  var listOfObject = []; var i = 0;
  try {
    var data = await csd.search(p_params).promise();
  
    while (i < data.hits.hit.length) {
      var obj = JSON.parse(JSON.stringify(data.hits.hit[i].fields).replace(/[\[\]']+/g, ''));
      var responseobj =  { 'L_ID': obj.l_id , 'L_Full_Name':obj.l_full_name };
      listOfObject.push(responseobj);
      i++;
    }
    console.log(listOfObject);
    console.log("GetLandlord  ended successfully !!!");
    return listOfObject;

  }
  catch (err) {
    return err;
  }

}