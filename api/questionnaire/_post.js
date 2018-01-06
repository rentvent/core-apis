import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import uuid from "uuid";


export async function submiteQuestionnaire(event, context, callback) {

    const data = JSON.parse(event.body);
    var landlordReviewParam = {
        TableName: "Landlord_Reviews",
        Item: {
            ID: uuid.v1(),
            LP_L_ID: data.landlordID,
            LR_T_ID: data.tenant_id,
            LR_Created_Date: Date.now(),
            LR_Types: [
                { LR_Type: "Advice", description: data.LL_Q_Advice },
                { LR_Type: "Con", description: data.LL_Q_Con },
                { LR_Type: "Pro", description: data.LL_Q_Pro },
                { LR_Type: "Status", description: data.LL_Q_Status },
                { LR_Type: "Rented", description: data.LL_Q_Time_Rented }
            ],
            LR_Title: data.LL_Q_Title,
            LR_Approval: data.LL_Q_Landlord_Approval,
            LR_Recommend: data.LL_Q_Recommend_Landlord,
            LR_Rating: data.LL_Q_Overall_Experience,
            LR_Responsiveness: data.LL_Q_Inquiries,
            LR_Repair_Requests: data.LL_Q_Repair_Requests,
            LR_Created_By: data.Created_By,
            LR_Updated_By: data.Updated_By,
            LR_Created_On: data.Created_On,
            LR_Updated_On: data.Updated_On,
            T_City: data.tenant_city,
            T_State: data.tenant_state
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

 
    var propertyReveiwParams = {
        TableName: "Property_Reviews",
        Item: {
            PR_ID: uuid.v1(),
            PR_T_ID: data.tenant_id,
            PR_Description: [
                { PR_Type: "Photo", description: data.P_Q_Property_Photos },
                { PR_Type: "Con", description: data.P_Q_Con },
                { PR_Type: "Pro", description: data.P_Q_Pro },
                { PR_Type: "Status", description: data.P_Q_Status }
            ],
            PR_Approval: data.P_Q_Recommend_Property,
            PR_Rating: data.P_Q_Overall_Experience,
            PR_Title: data.P_Q_Title,
            PR_Condition: data.P_Q_Condition_Listing,
            PR_Created_By: data.Created_By,
            PR_Updated_By: data.Updated_By,
            PR_Created_Date: data.Created_On,
            PR_Updated_On: data.Updated_On,
        }
    }

    try {
        if (data.Q_Type == "P") {
            var propertyReview = await dynamoDbLib.call("put", propertyReveiwParams);
            callback(null, success("success"));
        }
        
        var landlordReview = await dynamoDbLib.call("put", landlordReviewParam);
        var rental = await dynamoDbLib.call("put", Rentalparamscreate);

        callback(null, success("success"));
    } catch (e) {
        callback(null, failure(e));
    }
}


