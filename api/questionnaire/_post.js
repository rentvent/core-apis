import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import uuid from "uuid";
import format from "date-format";

export async function submiteQuestionnaire(event, context, callback) {

    const data = JSON.parse(event.body);

    var landlordReviewParam = {
        TableName: "Landlord_Reviews",
        Item: {
            ID: uuid.v1(),
            LP_L_ID: data.landlordID,
            LR_T_ID: data.tenant_id,
            LR_Types: [
                { LR_Type: "Advice", description: data.LL_Q_Advice },
                { LR_Type: "Con", description: data.LL_Q_Con },
                { LR_Type: "Pro", description: data.LL_Q_Pro }
            ],
            LR_Title: data.LL_Q_Title,
            LR_Approval: 0,
            LR_Recommend: data.LL_Q_Recommend_Landlord,
            LR_Rating: data.LL_Q_Overall_Experience,
            LR_Responsiveness: data.Q_LL_Response_Rate,
            LR_Repair_Requests: data.LL_Q_Repair_Requests,
            LR_Created_By: "Questionnaire",
            LR_Updated_By: "Questionnaire",
            LR_Created_On: format.asString(new Date()),
            LR_Updated_On: format.asString(new Date()),
            T_City: ' ',
            T_State: ' '
        }

    };

    var Rentalparamscreate = {
        TableName: "rv_rental",
        Item: {
            rental_id: uuid.v1(),
            R_Price: data.Q_Rental_Rate,
            //R_Start_Date: data.P_Q_Movein_Date,
            //R_End_Date: data.P_Q_Moveout_Date,
            R_Tenants: data.tenant_id,
            R_Deposit_Required: data.P_Q_Security_Required,
            R_Annual_Increase: data.P_Q_RR_Increase,
            R_Application_Fee: data.P_Q_Application_Fee_Required,
            R_Renters_Insurance: data.P_Q_Insurance,
            R_Created_By: "Questionnaire",
            R_Updated_By: "Questionnaire",
            R_Created_On: format.asString(new Date()),
            R_Updated_On: format.asString(new Date())
        }
    };

    var propertyReveiwParams = {
        TableName: "Property_Reviews",
        Item: {
            PR_ID: uuid.v1(),
            PR_T_ID: data.tenant_id,
            PR_Description: [
                { PR_Type: "Con", description: data.P_Q_Con },
                { PR_Type: "Pro", description: data.P_Q_Pro }
            ],
            PR_Approval: data.P_Q_Recommend_Property,
            PR_Rating: data.P_Q_Overall_Experience,
            PR_Title: data.Q_Title,
            PR_Condition: data.P_Q_Condition_Listing,
            PR_Created_By: "Questionnaire",
            PR_Updated_By: "Questionnaire",
            PR_Created_Date: format.asString(new Date()),
            PR_Updated_On: format.asString(new Date())
        }
    }

    var propertyReveiwParams = {
        TableName: "Property_Reviews",
        Item: {
            PR_ID: uuid.v1(),
            PR_T_ID: data.tenant_id,
            P_ID : data.propertyID,
            PR_Description: [
                { PR_Type: "Con", description: data.P_Q_Con },
                { PR_Type: "Pro", description: data.P_Q_Pro }
            ],
            PR_Approval: data.P_Q_Recommend_Property,
            PR_Rating: data.P_Q_Overall_Experience,
            PR_Title: data.P_Q_Title,
            PR_Condition: data.P_Q_Condition_Listing,
            PR_Created_By: "Questionnaire",
            PR_Updated_By: "Questionnaire",
            PR_Created_Date: format.asString(new Date()),
            PR_Updated_On:format.asString(new Date())
        }
    }

    try {
        if (data.Q_Type == "P") {
            var propertyReview = await dynamoDbLib.call("put", propertyReveiwParams);
            var rental = await dynamoDbLib.call("put", Rentalparamscreate);
            callback(null, success("success"));
        }

        var landlordReview = await dynamoDbLib.call("put", landlordReviewParam);

        callback(null, success("success"));
    } catch (e) {
        callback(null, failure(e));
    }

}