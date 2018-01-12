import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import uuid from "uuid";

export async function createTenant(event, context, callback) {


    let data = JSON.parse(event.body, function (key, value) {
        return (value == "") ? " " : value
    });

   // console.log(data);

    var result;
    var ID = uuid.v1();
    console.log(data.T_ID);
    const validateparams = {
        TableName: 'Tenant',
        FilterExpression: "T_ID = :t_id",
        ExpressionAttributeValues: {
            ":t_id": data.T_ID
        }
    };

    const params = {
        TableName: "Tenant",
        Item: {
            T_ID: ID,
            T_Anonymous: data.Anonymous,
            T_Profile_Pic_URL: data.T_Profile_Pic_URL,
            T_First_Name: data.FirstName,
            T_Last_Name: data.LastName,
            T_Phone: data.Phone,
            T_Address_Line1: data.AddressLine1,
            T_Address_Line2: data.AddressLine2,
            T_Zipcode: data.Zipcode,
            T_City: data.City,
            T_State: data.State,
            T_Country: data.Country,
            T_Photo_ID: data.PhotoID,
            T_Created_By: data.CreatedBy,
            T_Updated_By: data.UpdatedBy,
            T_Created_On: data.CreatedOn,
            T_Updated_On: data.UpdatedOn
        }
    };
    try {
        if (data.T_ID != null) {

            ID = data.T_ID;
            const validateresult = await dynamoDbLib.call("scan", validateparams);
            console.log(validateresult);
            if (validateresult.Count == 1 ) {
                console.log("exsit")
                result = validateresult.Items[0].T_ID;
                callback(null, success(result));
            }
            else
            {   
                console.log("NOT found");
                result = await dynamoDbLib.call("put", params);
                callback(null, success(ID));
            }
           
        }
        else {
            console.log("Add");
            result = await dynamoDbLib.call("put", params);
            callback(null, success(ID));
        }

        callback(null, success(result));
    } catch (e) {
        callback(null, failure(e));
    }
}

