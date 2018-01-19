import * as dynamoDbLib from "../../../libs/dynamodb-lib";
import { success, failure } from "../../../libs/response-lib";

export async function getpropertyById(event, context, callback) {
    const params = {
        TableName: 'rv_property',
        KeyConditionExpression: "P_ID = :p_id",

        ExpressionAttributeValues: {
            ":p_id": event.pathParameters.p_id
        }
    };
    try {
        const result = await dynamoDbLib.call("query", params);
        callback(null, success(result));
    } catch (e) {
        callback(null, failure(e));
    }
}

export async function getpropertyByAdddressDaynamo(event, context, callback) {

    var p_address = decodeURI(event.pathParameters.p_address).toUpperCase();
    const result = [];
    var params = {
        TableName: 'rv_property',
        FilterExpression: "contains(P_Address_Line1,:address)",
        ExpressionAttributeValues: {
            ":address": p_address
        }
    };
    try {
        const result = await dynamoDbLib.call("scan", params);

        callback(null, success(result));

    } catch (e) {
        callback(null, failure(e));
    }
}

