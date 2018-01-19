var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'rentvent.cue7vrfncc1o.us-east-1.rds.amazonaws.com',
    user: 'rentvent',
    password: 'rentvent',
    database: 'rentvent'
});

export function getPropByAddRDS(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err);
        }
        else {
            var resultlist = [];
            var i = 0;

            var p_address = decodeURI(event["pathParameters"]["p_address"]).toUpperCase();

            try {
                var sql = "SELECT P_ID, P_Address_Line1 FROM Property where P_Address_Line1 != ' ' and P_Address_Line1 like '%" + p_address + "%' LIMIT 50" ;
                connection.query(sql, p_address, function (err, rows) {
                    if (err != null)
                        callback(null, err);

                    console.log(rows)
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
};
