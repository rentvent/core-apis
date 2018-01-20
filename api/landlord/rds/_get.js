var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'rentvent.cue7vrfncc1o.us-east-1.rds.amazonaws.com',
    user: 'rentvent',
    password: 'rentvent',
    database: 'rentvent'
});

export  function getlandlordByNameRDS(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("After get connectioon " ,err);
            callback(err);
        }
        else {
            var resultlist = [];
            var i = 0;

            var Fname = decodeURIComponent(decodeURIComponent(event.pathParameters.Fname));
            try {
                var sql = "SELECT L_ID, L_Full_Name from rentvent.Landlord where UPPER(L_Full_Name)LIKE '%" + Fname.toUpperCase()+"%' ";
                console.log(sql);
                connection.query(sql, Fname,

                    function (err, rows) {
                        if (err != null)
                        {   console.log(err);
                            callback(null, err);
                        }


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
                console.log(e);
                callback(null, e);
            }

        }
    });

}