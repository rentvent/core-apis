var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'rentvent.cue7vrfncc1o.us-east-1.rds.amazonaws.com',
    user: 'rentvent',
    password: 'rentvent',
    database: 'rentvent'
});


export  function getlandlordByPropertyRDS(event, context, callback) {

    context.callbackWaitsForEmptyEventLoop = false;
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err);
        }

        else {
            var resultlist = [];
            var i = 0;

            var p_id = event["pathParameters"]["p_id"];
            // var p_id = '2005009003';
            try {
                '%[ { p_id:2004001005 } ]%' ;
                var sql ="SELECT * FROM Landlord where L_Properties like '%p_id : " + p_id + "%' ";
                console.log(sql);
                connection.query(sql, p_id,
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
                console.log("catch block " ,err);
                callback(null, e);

            }

        }
    });

}

