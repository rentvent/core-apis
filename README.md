

Get Started

Prerequisites:

1) NodeJS 6.10
2) Serverless Framework 1.23 —> npm i -g serverless

Please note :  the node_mpdel already pushed in reposotiry 
To work Offline 
 1- install serverless offline —> npm install serverless-offline -D

 2- start the server —> sls offline start
  
To Deploy on AWS 

sls deploy —> “deploy all lambda functions “ 
sls deployfunction -f FuncName.  —> “ Deploy just one function “

To Delete Stack 

sls remove


EndPoint :
  GET - https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/cloudsearch/{p_name}
  GET - https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/property/{lp_address}
  GET - https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/{l_id}
  GET - https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/property/{p_id}
  GET - https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/property/address/{p_address}
  GET - https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/Complaints/cloudsearch/{p_address}
  GET - https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/Complaints/{c_id}
  GET - https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/rental/{r_id}
  GET - https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/question/{q_type}/{search_by}/{search_val}
  POST - https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/questionnaire
  POST - https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/tenant

  



Example: 
get landlord by address 

https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/property/333%20CROWN%20DR

get land landlord by ID 

https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/2280022031


get property by ID 
https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/property/2280022031

 
