import { success, failure } from "../../../libs/response-lib";
var mysql = require('mysql');


var connection = mysql.createConnection({
    host     : 'rentvent.cue7vrfncc1o.us-east-1.rds.amazonaws.com',
    user     : 'rentvent',
    password : 'rentvent',
    database: 'rentvent'
});


export async function getlandlordByPropertyRDS(event, context, callback) {

    context.callbackWaitsForEmptyEventLoop = false;
    connection.getConnection(function (err, connection) {
        if (err) {
            callback(err);
        }
        else {
            var resultlist = [];
            var i = 0;

            var p_id = event["pathParameters"]["p_id"];
            // var p_id = '2005009003';
            try {
                connection.query("SELECT * FROM Landlord where L_Properties like '%p_id : " + p_id + "%' ",
                    function (err, rows) {
                        if (err != null)
                            callback(null, err);
                        while (i < rows.length) {
                            resultlist.push(
                                {
                                    'L_ID': rows[i].L_ID,
                                    'L_Full_Name': rows[i].L_Full_Name

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
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Credentials": true
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

export  function getlandlordByNameRDS(event, context, callback) {

    context.callbackWaitsForEmptyEventLoop = false;
    connection.getConnection(function (err, connection) {
        if (err) {
            callback(err);
        }
        else {
            var resultlist = [];
            var i = 0;

            var Fname = event["pathParameters"]["Fname"].toUpperCase();

            try {
                connection.query("SELECT L_ID, L_Full_Name from rentvent.Landlord where L_Full_Name LIKE '% " +Fname +"%'",
                    function (err, rows) {
                        if (err != null)
                            callback(null, err);
                        while (i < rows.length) {
                            resultlist.push(
                                {
                                    'L_ID': rows[i].L_ID,
                                    'L_Full_Name': rows[i].L_Full_Name

                                });
                            i++;
                        }

                        console.log("befor" ,resultlist);

                        var responseBody = {
                            resultlist
                        };

                        var response = {
                            "statusCode": 200,
                            "headers": {
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Credentials": true
                            },
                            "body": JSON.stringify(responseBody),
                            "isBase64Encoded": false
                        };
                        callback(null, success(resultlist));


                    });
            }
            catch (e) {
                console.log(e);
                callback(null, e);
            }

        }
    });

}