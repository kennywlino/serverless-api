const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema({
    "id": Number,
    "name": String,
    "phone": String
});

const peopleModel = dynamoose.model('people', schema);

exports.handler = async(event) => {
    
    let parsedBody = JSON.parse(event.body);

    const response = { statusCode: null, body: null };
    try {
        let result = await peopleModel.create(parsedBody);
        response.statusCode = 200;
        response.body = JSON.stringify(result);
    } catch(e) {
        response.statusCode = 500;
        response.body = JSON.stringify(e.message);
    }
    return response;
};
