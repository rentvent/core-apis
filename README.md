

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

 GET - https://srnezkfid4.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/search/{Fname}
  GET - https://srnezkfid4.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/property/{p_id}
  GET - https://srnezkfid4.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/property/address/{address}
  GET - https://srnezkfid4.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/rental/{r_id}
  GET - https://srnezkfid4.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/question/{q_type}/{search_by}/{search_val}
  GET - https://srnezkfid4.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/Complaints/{c_id}
  POST - https://srnezkfid4.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/questionnaire
  POST - https://srnezkfid4.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/tenant
  GET - https://srnezkfid4.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/{l_id}

