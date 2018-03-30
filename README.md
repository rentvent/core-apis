

# Get Started

#### Prerequisites 

1. NodeJS 6.10
2. Serverless Framework 1.23 :
```
 npm i -g serverless
```
3. Credentials Configuration
```
serverless config credentials --provider aws --key ****** --secret ****+******** --profile rv_nonprod
```
More details/Video Tutorial on how to create IAM user and more on configuring AWS credentials can be found [here](https://serverless.com/framework/docs/providers/aws/guide/credentials/). 

### Run The project
1. Install NPM packeges
 ``` 
 npm install 
 ```
Please note :  the node_model already pushed in reposotiry 

2.1 Testing api gateway locally

 1. install serverless offline :
 ```
 npm install serverless-offline -D
```
 2. start the server :
```
 sls offline start
```
  
  ### Deploy the project
* Deploying function to AWS**

``` sls deploy  ```:  Deploy all lambda functions
```sls deployfunction -f FuncName ``` : Deploy one function

*  Delete Stack :

``` sls remove ```


# EndPoint :
  * CloudSearch :**
  
1. get landlord by name <br />
    https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/cloudsearch/{p_name}
2. get landlord by property address<br />
    https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/property/{lp_address}
  
3.  get complaints by address<br />
    https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/Complaints/cloudsearch/{p_address}

  * DynamoDB:
  
4. get landlord Info by ID <br />
   https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/{l_id}
5. get property Info by ID<br /> 
   https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/property/{p_id}
  
6. get complaints by ID <br />
   https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/Complaints/{c_id}
  
7. get rental by ID <br />
   https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/rental/{r_id}
8. get question <br />
    https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/question/{q_type}/{search_by}/{search_val}
9. post questionner <br />
   https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/questionnaire
10. post tenant <br />
   https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/tenant


Example: 
get landlord by address 

https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/property/333%20CROWN%20DR

get land landlord by ID 

https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/2280022031


get property by ID 
https://rm9ikv7dkc.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/property/2280022031

 
