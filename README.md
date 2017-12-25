# landlord-apis

Get Started

Prerequisites:

1) NodeJS 6.10
2) Serverless Framework 1.23 —> npm i -g serverless

3) Credentials Configuration 

AWS Account for Dynamo: rv_nonprod 
Access Key ID: AKIAJHHO3XW5OWT4LX2Q
Secret Access Key: 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



serverless config credentials --provider aws --key AKIAJHHO3XW5OWT4LX2Q --secret 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 --profile rv_nonprod -o


To work Offline 
 1- install serverless offline —> npm install serverless-offline -D

 2- start the server —> sls offline start
  
To Deploy on AWS 

sls deploy —> “deploy all lambda functions “ 
sls deployfunction -f FuncName.  —> “ Deploy just one function “

To Delete Stack 

sls remove

