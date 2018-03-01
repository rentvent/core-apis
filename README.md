

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
get landlord by name 
  https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/cloudsearch/doad

get landlord by address 
  https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/property/y

get landlord by ID 
  https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/3005044007

get property  by ID 
  https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/property/3109002069

get proeprty by address
  https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/property/address/wee

  get complatins by address 
https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/Complaints/cloudsearch/e

get complaints by ID 
https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/Complaints/61f91bb6-f944-11e7-8ada-06e4deec977a

