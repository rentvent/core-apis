import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import uuid from "uuid";


export async function submiteQuestionnaire(event, context, callback) {

    const data = JSON.parse(event.body);

    //update Landlord  
    var Landlordparams = {
        TableName: "rv_landlord",
        Key: {
            "landlord_id": data.landlordID
        },

        UpdateExpression: "SET #attrName = list_append(if_not_exists(#attrName, :empty_list), :my_value)",
        ExpressionAttributeNames: {
            "#attrName": "L_Reviews"
        },
        ExpressionAttributeValues: {
            ":my_value": [
                {
                    "LR_Created_Date": Date.now(),
                    "LR_Description": [
                        { "LR_Type": "Advice", "description": data.Q_Advice },
                        { "LR_Type": "con", "description": data.Q_Con },
                        { "LR_Type": "pro", "description": data.Q_Pro }
                    ],
                    "LR_Title": data.Q_Title,
                    "T_ID": data.tenantID
                }],
            ":empty_list": []
        }
    };

    var Rentalparamscreate = {
        TableName: "rv_rental",
        Item: {
            rental_id: uuid.v1(),
            R_Price: data.Q_Rental_Rate,
            R_Lease_Required: data.LeaseRequired,
            R_Start_Date: data.Q_Movein_Date,
            R_End_Date: data.Q_Moveout_Date,
            R_Tenants: data.tenantID,
            R_Deposit_Required: data.Q_Security_Required,
            R_Deposit_Amount: data.Q_Security_Required_Amount,
            R_Deposit_Returned: data.Q_Security_Returned,
            R_Deposit_Return_Date: data.Q_Secuirity_Return_Date,
            R_Annual_Increase: data.Q_RR_Increase,
            R_Application_Fee: data.Q_Application_Fee_Amount,
            R_Issues_Photos: data.Q_Rodent_Photo,
            R_Renters_Insurance: data.Q_Insurance,
            R_Updated_By: data.Updated_By,
            R_Updated_On: data.Updated_On
        }
    };

    var landlordReviewParam = {
        TableName: "Landlord_Reviews",
        Item: {
            ID: uuid.v1(),
            LR_Created_Date: Date.now(),
            LR_Types: [
                { LR_Type: "Advice", description: data.Q_Advice },
                { LR_Type: "con", description: data.Q_Con },
                { LR_Type: "pro", description: data.Q_Pro }
            ],
            LR_Title: data.Q_Title,
            LR_T_ID: data.tenant_id,
            LR_Approval: data.Q_Landlord_Approval,
            LR_Rating: data.Q_Overall_Experience,
            LR_Responsiveness: data.Q_Inquiries,
            LR_Repair_Requests: data.Q_Repair_Requests,
            LR_Created_By: data.Created_By,
            LR_Updated_By: data.Updated_By,
            LR_Created_On: data.Created_On,
            LR_Updated_On: data.Updated_On
        }
    };

    var propertyReveiwParams = {
        TableName: "Landlord_Property",
        Item: {
            ID:uuid.v1(),
            LP_L_ID: data.landlordID,
            LP_P_ID: data.propertyID,
            LP_Start_Date: data.Q_Movein_Date,
            LP_End_Date: data.Q_Moveout_Date,
            LP_Created_By: data.Created_By,
            LP_Updated_By: data.Updated_By,
            LP_Created_On: data.Created_On,
            LP_Updated_On: data.Updated_On
        }
    }

    try {
        var landlord = await dynamoDbLib.call("update", Landlordparams);
        var rental  =  await dynamoDbLib.call("put",Rentalparamscreate);
        var landlordReview = await dynamoDbLib.call("put", landlordReviewParam);
        var propertyReview = await dynamoDbLib.call("put", propertyReveiwParams);
        
        callback(null, success("success"));
    } catch (e) {
        callback(null, failure(e));
    }
}


