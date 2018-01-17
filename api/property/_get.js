import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";



var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'rentvent.cue7vrfncc1o.us-east-1.rds.amazonaws.com',
    user: 'rentvent',
    password: 'rentvent',
    database: 'rentvent'
});


export async function getpropertyById(event, context, callback) {
    const params = {
        TableName: 'rv_property',
        KeyConditionExpression: "P_ID = :p_id",

        ExpressionAttributeValues: {
            ":p_id": event.pathParameters.p_id
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

    var p_address = decodeURI(event.pathParameters.p_address).toUpperCase();
    const result = [];
    var params = {
        TableName: 'rv_property',
        FilterExpression: "contains(P_Address_Line1,:address)",
        ExpressionAttributeValues: {
            ":address": p_address
        }
    };
    try {
        const result = await dynamoDbLib.call("scan", params);

        callback(null, success(result));

    } catch (e) {
        callback(null, failure(e));
    }
}

export  function getpropertyByAdddressRDS(event, context, callback) {

    context.callbackWaitsForEmptyEventLoop = false;
    connection.getConnection(function (err, connection) {
        if (err) {
            callback(err);
        }
        else {
            var resultlist = [];
            var i = 0;

            var p_address = decodeURI(event["pathParameters"]["p_address"]).toUpperCase();
            //var p_address = '14301';
            try {
                connection.query("SELECT * FROM Property where  P_Address_Line1 != ' ' and P_Address_Line1 like '%" + p_address + "%' LIMIT 50",
                    function (err, rows) {
                        if (err != null)
                            callback(null, err);

                        while (i < rows.length) {
                            resultlist.push({
                                'P_ID': rows[i].P_ID,
                                'P_Address_Line1': rows[i].P_Address_Line1
                            });
                            i++;
                        }
                        console.log(resultlist);

                        var responseBody = {
                            resultlist
                        };

                        var response = {
                            "statusCode": 200,
                            "headers": {
                                "my_header": "my_value"
                            },
                            "body": JSON.stringify(responseBody),
                            "isBase64Encoded": false
                        };
                        callback(null, response);


                    });
            }
            catch (e) {
                callback(null, e);
            }

        }
    });
}