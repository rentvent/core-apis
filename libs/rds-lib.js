
import * as  mysql from "mysql" ;
import  * as async from "async" ;




var connection = mysql.createConnection({
    host: 'rentvent.cue7vrfncc1o.us-east-1.rds.amazonaws.com',
    user: 'rentvent',
    password: 'rentvent',
    database: 'rentvent'
});


exports.getConnectionData = connection ;