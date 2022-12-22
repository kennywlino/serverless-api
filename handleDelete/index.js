const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema({
    "id": Number,
    "name": String,
    "phone": String
});

const peopleModel = dynamoose.model('people', schema);

exports.handler = async(event) => {
    
    const peopleId = JSON.parse(event.pathParameters.id);

    const response = { statusCode: null, body: null };
    try {
        await peopleModel.delete(peopleId);
        response.statusCode = 200;
        console.log("Item was successfully deleted.");
        response.body = JSON.stringify({});
    } catch(e) {
        response.statusCode = 500;
        response.body = JSON.stringify(e.message);
    }
    return response;
};
