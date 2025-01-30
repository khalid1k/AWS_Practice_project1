// const AWS = require("aws-sdk");
// const dynamoDb = new AWS.DynamoDB.DocumentClient();
// const bcrypt = require("bcryptjs");

const { createUser } = require("../functions/user/user");

// const createUser = async(item , tableName)=>{
//     try{
//         const timestamp = new Date().toISOString();
//         const params = {
//             "TableName": tableName,
//             "Item": {
//                 ...item,
//                 createdAt: timestamp,
//                 updateAt: timestamp
//             }
//         }

//         return dynamoDb.put(params).promise();
//     }catch(err){
//         console.log("error", err);
//         return err
//     }
// }

// module.exports = {
//     createUser
// }



// const AWS = require("aws-sdk");
// const dynamoDb = new AWS.DynamoDB.DocumentClient();
// const bcrypt = require("bcryptjs");

// const createUser = async (item, tableName) => {
//     try {
//         const timestamp = new Date().toISOString();
//         const params = {
//             TableName: tableName,
//             Item: {
//                 ...item,
//                 createdAt: timestamp,
//                 updatedAt: timestamp
//             }
//         };

//         console.log("DynamoDB PUT Params:", JSON.stringify(params, null, 2));

//         return await dynamoDb.put(params).promise();
//     } catch (err) {
//         console.error("DynamoDB PUT Error:", err);
//         throw err;
//     }
// };


import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const getItem = async (tableName, key) => {
    return await docClient.send(new GetCommand({ TableName: tableName, Key: key }));
};

export const putItem = async (tableName, item) => {
    return await docClient.send(new PutCommand({ TableName: tableName, Item: item }));
};


module.exports = {
    getItem, putItem
};
