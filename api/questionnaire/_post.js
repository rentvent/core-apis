import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import uuid from "uuid";


export async function submiteQuestionnaire(event, context, callback) {

    const data = JSON.parse(event.body);
    const params = {
        TableName: "primary_form",
        Item: {
            ID:uuid.v1(),
            Q_Status: data.status,
            Q_Overall_Experience: data.overallExperince,
            Q_Landlord_Approval: data.LandlordApproval,
            Q_Recommend_Property: data.RecommendProperty,
            Q_Title: data.Title,
            Q_Pro: data.Pro,
            Q_Con: data.Con,
            Q_Advice: data.Advice,
            Q_Property_Photos: data.PropertyPhotos
        }
    };
    try {
        const result = await dynamoDbLib.call("put", params);
        callback(null, success(result));
    } catch (e) {
        callback(null, failure(e));
    }
}
/*
export async function QuestionnaireSecondaryForm(event, context, callback) {

    const data = JSON.parse(event.body);
    const params = {
        TableName: "secondary_form",
        Item: {
            ID:uuid.v1(),
            Q_Movein_Date:data.MoveinDate,
            Q_Moveout_Date:data.MoveoutDate,
            Q_Inquiries:data.Inquiries,
            Q_Repair_Requests:data.RepairRequests,
            Q_Condition_Listing:data.ConditionListing,
            Q_Rental_Rate:data.RentalRate,
            Q_Security_Required:data.SecurityRequired,
            Q_Security_Required_Amount:data.SecurityRequiredAmount,
            Q_Security_Returned:data.SecurityReturned,
            Q_Secuirity_Return_Date:data.SecuirityReturnDate,
            Q_Lease_Required:data.LeaseRequired,
            Q_Lease_Length:data.LeaseLength,
            Q_Lease_Expiration:data.LeaseExpiration,
            Q_Lease_Experation_NA:data.LeaseExperationNA,
            Q_RR_Increase:data.RRIncrease,
            Q_RR_Increase_Date:data.RRIncreaseDate,
            Q_RR_Increase_Amount:data.RRIncreaseAmount,
            Q_Application_Fee_Required:data.ApplicationFeeRequired,
            Q_Application_Fee_Amount:data.ApplicationFeeAmount,
            Q_Rodent:data.Rodent,
            Q_Rodent_Photo:data.RodentPhoto,
            Q_Insurance:data.Insurance,
            Q_LL_Response:data.LLResponse
        }
    };
    try {
        const result = await dynamoDbLib.call("put", params);
        callback(null, success(result));
    } catch (e) {
        callback(null, failure(e));
    }
}*/