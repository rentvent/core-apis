# landlord-apis

Get Started

Prerequisites:

1) NodeJS 6.10
2) Serverless Framework 1.23 —> npm i -g serverless

3) Credentials Configuration 

AWS Account for Dynamo: rv_nonprod 
Access Key ID: AKIAJUXEF4KKGKY5ZVEA
Secret Access Key: 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

serverless config credentials --provider aws --key AKIAJUXEF4KKGKY5ZVEA --secret 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 --profile rv_nonprod


To work Offline 
 1- install serverless offline —> npm install serverless-offline -D

 2- start the server —> sls offline start
  
To Deploy on AWS 

sls deploy —> “fOR all project “ 
sls deployfunction -f FuncName.  —> “ Deploy just one function “

To Delete Stack 

sls remove

