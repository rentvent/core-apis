
var mysql = require('mysql');
var connection = mysql.createPool({
    host: 'rentvent.cue7vrfncc1o.us-east-1.rds.amazonaws.com',
    user: 'rentvent',
    password: 'rentvent',
    database: 'rentvent'
});

export  function getComplaintsRDS (event,context,callback){
    context.callbackWaitsForEmptyEventLoop = false;
    connection.getConnection(function (err, connection) {
        if (err) {
            callback(err);
        }
        else {
            var resultlist = [];
            var i = 0;

            //var c_id = '61a5ca9b-f944-11e7-8ada-06e4deec977a';
              var c_id = decodeURI(event["pathParameters"]["c_id"])

            try {
                var sql = "SELECT * FROM Complaints where C_ID = ?";
                connection.query(sql, c_id, function(err, rows) {
                        if (err != null)
                            callback(null, err);

                        console.log(rows[0]);

                        while (i < rows.length) {
                            resultlist.push(
                                {
                                    'C_ID' : rows[i].C_ID ,
                                    'T_ID' : rows[i].T_ID ,
                                    'C_Address_Line1' : rows[i].C_Address_Line1,
                                    'C_Address_Fraction_No' : rows[i].C_Address_Fraction_No,
                                    'C_Address_Street_Direction':rows[i].C_Address_Street_Direction,
                                    'C_Address_Zip' : rows[i].C_Address_Zip,
                                    'C_Case_Number':rows[i].C_Case_Number,
                                    'C_Case_Generated':rows[i].C_Case_Generated,
                                    'C_Case_Closed':rows[i].C_Case_Closed,
                                    'C_Response_Days':rows[i].C_Response_Days,
                                    'C_Status':rows[i].C_Status,
                                    'C_Created_By':rows[i].C_Created_By,
                                    'C_Updated_By':rows[i].C_Updated_By,
                                    'C_Created_On':rows[i].C_Created_On,
                                    'C_Updated_On':rows[i].C_Updated_On

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
};
