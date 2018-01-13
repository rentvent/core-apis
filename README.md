

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

   GET - https://ykfhhoo131.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/search/{Fname}
   GET - https://ykfhhoo131.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/property/{p_id}
   GET - https://ykfhhoo131.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/rental/{r_id}
   GET - https://ykfhhoo131.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/question/{q_type}/{search_by}/{search_val}
   GET - https://ykfhhoo131.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/Complaints/{c_id}
   POST - https://ykfhhoo131.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/questionnaire
   POST - https://ykfhhoo131.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/tenant
   GET - https://ykfhhoo131.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/{l_id}
   GET - https://ykfhhoo131.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/address/{p_id}
   GET - https://ykfhhoo131.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/property/address/{p_address}






Example of mocked data : 

https://srnezkfid4.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/00452ce4-f4de-11e7-95ef-83751e69d09d

https://srnezkfid4.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/01b25f67-f5a7-11e7-bc5c-534144f03d11

https://srnezkfid4.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/address/6716