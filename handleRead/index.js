const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema({
    "id": Number,
    "name": String,
    "phone": String
});

const peopleModel = dynamoose.model('people', schema);

exports.handler = async(event) => {

    const response = { statusCode: null, body: null };
    
    // checking if this is getOne and storing the ID if so
    let peopleId;
    
    console.log(event);
    
    if (event.pathParameters) {
       peopleId = JSON.parse(event.pathParameters.id);
    } 
    
    // getOne
    if (peopleId) {
        try {
            let result = await peopleModel.get(peopleId);
            response.statusCode = 200;
            response.body = JSON.stringify(result);
        } catch(e) {
            response.statusCode = 500;
            response.body = JSON.stringify(e.message);
        }
        
    // getAll 
    } else {
        try {
            let result = await peopleModel.scan().exec();
            response.statusCode = 200;
            response.body = JSON.stringify(result);
        } catch(e) {
            response.statusCode = 500;
            response.body = JSON.stringify(e.message);
        }
    }
    return response;
};
