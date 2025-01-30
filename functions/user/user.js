
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
