const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand , UpdateCommand, DeleteCommand} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const getItem = async (tableName, key) => {
    return await docClient.send(new GetCommand({ TableName: tableName, Key: key }));
};

const putItem = async (tableName, item) => {
    return await docClient.send(new PutCommand({ TableName: tableName, Item: item }));
};

const updateItem = async (tableName, key, updates) => {
    const updateExpression = [];
    const expressionAttributeValues = {};
    
    Object.keys(updates).forEach((field, index) => {
        updateExpression.push(`${field} = :val${index}`);
        expressionAttributeValues[`:val${index}`] = updates[field];
    });

    return await docClient.send(
        new UpdateCommand({
            TableName: tableName,
            Key: key,
            UpdateExpression: `SET ${updateExpression.join(", ")}`,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "ALL_NEW",
        })
    );
};

const deleteItem = async (tableName, key) => {
    return await docClient.send(
        new DeleteCommand({
            TableName: tableName,
            Key: key,
        })
    );
};


module.exports = {
    getItem,
    putItem,
    updateItem,
    deleteItem
};
