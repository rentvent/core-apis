import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import uuid from "uuid";

export async function createTenant(event, context, callback) {

    const data = JSON.parse(event.body);
    const params = {
        TableName: "Tenant",
        Item: {
            T_ID :uuid.v1(),
            T_Anonymous:data.Anonymous,
            T_First_Name:data.FirstName,
            T_Last_Name : data.LastName,
            T_Phone:data.Phone,
            T_Address_Line1:data.AddressLine1,
            T_Address_Line2:data.AddressLine2,
            T_Zipcode:data.Zipcode,
            T_City:data.City,
            T_State:data.State,
            T_Country:data.Country,
            T_Photo_ID:data.PhotoID,
            T_Created_By:data.CreatedBy,
            T_Updated_By:data.UpdatedBy,
            T_Created_On:data.CreatedOn,
            T_Updated_On:data.UpdatedOn
        }
    };
    try {
        const result = await dynamoDbLib.call("put", params);
        callback(null, success(result));
    } catch (e) {
        callback(null, failure(e));
    }
}