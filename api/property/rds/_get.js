var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'rentvent.cue7vrfncc1o.us-east-1.rds.amazonaws.com',
    user: 'rentvent',
    password: 'rentvent',
    database: 'rentvent'
});


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