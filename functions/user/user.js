
const { putItem , getItem, updateItem, deleteItem} = require("../../utills/dyanmoDb");

exports.createUser = async (event) => {
    try {
        const body = JSON.parse(event.body);
        // Extracting fields from request body
        const { id, name, email, age } = body;

        const tableName = "usersTable-dev";

        // Save user in DynamoDB
        const res = await putItem(tableName, { id, name, email, age });

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

//function to get the user

exports.getUser = async (event) => {
    try {
        const { id } = event.pathParameters; // Extract ID from URL
        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "ID parameter is required" }),
            };
        }

        const tableName = "usersTable-dev";
        const key = { id }; // Adjust based on your DynamoDB schema

        const result = await getItem(tableName, key);

        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "User not found" }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(result.Item),
        };
    } catch (error) {
        console.error("Error fetching user:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
};

exports.updateUser = async (event) => {
    try {
        const { id } = event.pathParameters;
        const body = JSON.parse(event.body);

        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "ID parameter is required" }),
            };
        }

        if (Object.keys(body).length === 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "No update fields provided" }),
            };
        }

        const tableName = "usersTable-dev";

        const updatedUser = await updateItem(tableName, { id }, body);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "User updated successfully",
                user: updatedUser.Attributes,
            }),
        };
    } catch (error) {
        console.error("Error updating user:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
};

exports.deleteUser = async (event) => {
    try {
        const { id } = event.pathParameters;

        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "ID parameter is required" }),
            };
        }
        const response = await deleteItem("usersTable-dev", { id});
        console.log("User deleted successfully", response);
        return {
            statusCode: 200,
            body: JSON.stringify({message: "user is deleted successfully", response})
        }
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};
