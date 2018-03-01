import { success, failure } from "../../../libs/response-lib";
import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-1" });

export async function getPropertySearch(event, context, callback) {
  
  var p_address = decodeURIComponent(decodeURIComponent(event["pathParameters"]["p_address"]));
  console.log(p_address);
  var csd = new AWS.CloudSearchDomain({
    endpoint: 'doc-property-aqniai7oxuysu7fwtdg6jkl22e.us-east-1.cloudsearch.amazonaws.com',
    apiVersion: '2013-01-01'
  });
  var params = {
    query: p_address,
    queryOptions : "{'fields':['p_address_line1']}" 
  };

  csd.search(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      callback(null, failure(err));
    }
    else {
      var listOfObject = []; var i = 0;

      while (i < data.hits.hit.length) {
        var obj = JSON.parse(JSON.stringify(data.hits.hit[i].fields).replace(/[\[\]']+/g, ''));
        var responseObj= {
          'P_ID': obj.p_id,
          'P_Address_Line1': obj.p_address_line1
        }
        listOfObject.push(responseObj);
        i++;
      }

      //console.log(listOfObject);
      callback(null, success(listOfObject));

    }
  });

}
