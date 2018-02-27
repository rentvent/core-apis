import { success, failure } from "../../../libs/response-lib";
import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-1" });

export async function getLandlordSearch(event, context, callback) {


  var csd = new AWS.CloudSearchDomain({
    endpoint: 'search-landlord-v2-yjef3lzy36f3gpjc4iqo5dpula.us-east-1.cloudsearch.amazonaws.com',
    apiVersion: '2013-01-01'
  });
  var params = {
    query: event.pathParameters.p_name
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
        listOfObject.push(obj);
        i++;
      }

      //console.log(listOfObject);
      callback(null, success(listOfObject));

    }
  });

}
