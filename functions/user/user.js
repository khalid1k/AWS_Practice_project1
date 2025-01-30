// const response = require("../../utills/response");
// const {createUser} = require("../../utills/dyanmoDb");
// const { putItem, getItem} = require("../../utills/dyanmoDb");
// module.exports.createUser = async (event, context) => {
    
//     console.log("event ", event.body);
//     const body = JSON.parse(event.body);
//     console.log("now body value is ", body);
//     //create and save the user to the database
//     const res = await createUser(body, "usersTable-dev")
//     console.log("response is ", response);
//     return {...response.success, body: JSON.stringify(res)}
// }


const { putItem } = require("../../utills/dyanmoDb");

exports.createUser = async (event) => {
    try {
        const body = JSON.parse(event.body);

        // Extracting fields from request body
        const { id, name, email, age } = body;

        const tableName = "usersTable-dev";

        // Save user in DynamoDB
        const res = await putItem(tableName, { id, name, email, age });
        console.log("Response of creating user: ", res);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "User created successfully", user: { id, name, email, age } })
        };
    } catch (error) {
        console.error("Error inserting user:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
};
