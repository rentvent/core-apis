import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function getlandlordByName(event, context, callback) {

  const params = {
    TableName: 'rv_landlord',
    FilterExpression: "contains(L_Full_Name,:Fname)",
    ExpressionAttributeValues: {
      ":Fname": event.pathParameters.Fname.toUpperCase()
    },
    Limit: 1000,
  };
  try {
    const result = await dynamoDbLib.call("scan", params);

    var resultList = [];
    for (let item of result.Items) {
      var object = {
        L_ID: item.L_ID,
        L_Full_Name: item.L_Full_Name
      }
      resultList.push(object)
    }

    callback(null, success(resultList));
  } catch (e) {
    callback(null, failure(e));
  }
}

export async function getlandlordByaddress(event, context, callback) {

  const params = {
    TableName: 'rv_property',
    FilterExpression: "contains(P_Address_Line1,:address)",
    ExpressionAttributeValues: {
      ":address": event.pathParameters.address
    }
  };
  try {
    const result = await dynamoDbLib.call("scan", params);

    for (let item of result.Items) {
      const params = {
        TableName: 'rv_landlord',
        FilterExpression: "",
        ExpressionAttributeValues: {
          ":address": event.pathParameters.address
        }
      };

    }


    callback(null, success(result));
  } catch (e) {
    callback(null, failure(e));
  }


}


export async function getlandlordInfo(event, context, callback) {

  var L_Avg_Rating = 0;
  var L_Approval_Rate = 0;
  var L_Repair_Requests = 0;
  var L_Response_Rate = 0;
 // console.log(event.pathParameters.l_id) ;
  const params = {
    TableName: 'rv_landlord',
    KeyConditionExpression: "L_ID = :l_id",
    ExpressionAttributeValues: {
      ":l_id": event.pathParameters.l_id
    }
  };
  const L_ReviewsParams = {
    TableName: 'Landlord_Reviews',
    FilterExpression: "LP_L_ID = :l_ID",
    ExpressionAttributeValues: {
      ":l_ID": event.pathParameters.l_id
    }
  };

  try {

    const result = await dynamoDbLib.call("query", params);
    //console.log("First Step ", result);
    const Review = await dynamoDbLib.call("scan", L_ReviewsParams);
    console.log("second Step ", Review);
   result.Items[0].Landlord_Reviews = Review.Items;

    var l_responsive, l_approval;
    var ReviewResponseList = [];
    //Compute AVG 
    if (Review.Count >= 1) {
      for (let item of Review.Items) {

        l_responsive = item.LR_Responsiveness;
        l_approval = item.LR_Responsiveness;

        l_responsive = l_responsive == 'yes' ? 1 : 0;
        l_approval = l_approval == 'yes' ? 1 : 0;

        L_Response_Rate = L_Response_Rate + item.LR_Responsiveness;
        L_Approval_Rate = L_Approval_Rate + item.LR_Approval;

        L_Avg_Rating = L_Avg_Rating + item.LR_Rating;
        L_Repair_Requests = L_Repair_Requests + item.LR_Repair_Requests;


        console.log(item.T_ID);
        if (item.T_ID != "undefined") {
          var TenantParams = {
            TableName: 'Tenant',
            FilterExpression: "T_ID = :t_id",
            ExpressionAttributeValues: {
              ":t_id": item.T_ID
            }
          };
          var Tenant = await dynamoDbLib.call("scan", TenantParams);
          //console.log("Tenent Data ", Tenant);
          // console.log(Tenant.Items[0].T_City);

          var ReviewResponse = {
            'LR_Title': item.LR_Title,
            'LR_Types': item.LR_Types,
            'LR_Created_Date': item.LR_Created_Date,
            'LR_Rating': item.LR_Rating,
            'LR_Responsiveness': item.LR_Responsiveness,
            'LR_Repair_Requests': item.LR_Repair_Requests,
            'LR_Approval': item.LR_Approval,
            'T_City': Tenant.Items[0].T_City,
            'T_State': Tenant.Items[0].T_State
          };
          ReviewResponseList = ReviewResponseList.concat(ReviewResponse);
        }
      }
    }

    result.Items[0].Landlord_Reviews = ReviewResponseList;
    result.Items[0].L_Response_Rate = l_responsive / Review.Count;
    result.Items[0].L_Avg_Rating = L_Avg_Rating / Review.Count;
    result.Items[0].L_Approval_Rate = l_approval / Review.Count;
    result.Items[0].L_Repair_Requests = L_Repair_Requests / Review.Count;

    
        var L_Properties = [];
      //  console.log(result.Items[0].L_Properties);
        if (result.Items[0].L_Properties.length > 0) {
             
          for (let prop of result.Items[0].L_Properties) {
          console.log(prop.p_id);
            var L_PropertiesParams = {
              TableName: 'rv_property',
              FilterExpression: "P_ID = :p_id",
              ExpressionAttributeValues: {
                ":p_id": prop.p_id.toString()
              }
            };
            var properties = await dynamoDbLib.call("scan", L_PropertiesParams);
        
             console.log(properties);
            if (properties.Count > 0) {
                              
              var PropertiesReviewParams = {
                TableName: 'Property_Reviews',
                FilterExpression: "P_ID = :p_id",
                ExpressionAttributeValues: {
                  ":p_id": prop.p_id.toString()
                }
              };
      
              const propertiesReview = await dynamoDbLib.call("scan", PropertiesReviewParams);
              console.log(propertiesReview);
              var propResponse = {
                'P_ID': properties.Items[0].P_ID,
                'P_Photos': properties.Items[0].P_Photos,
                'P_Address_Line1': properties.Items[0].P_Address_Line2,
                'P_Address_Line2': properties.Items[0].P_Address_Line2,
                'P_City': properties.Items[0].P_City,
                'P_Zipcode':properties.Items[0].P_Zipcode,
                'P_State': properties.Items[0].P_State,
                'PR_Rating': properties.Items[0].P_Avg_Rating,
                'PR_Count': propertiesReview.Count
              };
              L_Properties = L_Properties.concat(propResponse);
            }
          }
        }
       console.log(result.Items);
       result.Items[0].L_Properties = L_Properties;

    callback(null, success(result));    
  } catch (e) {
    callback(null, failure(e));
  }
}