'use strict'
const AWS = require('aws-sdk')
const model = require('../models/planet').planet

AWS.config.setPromisesDependency(require('bluebird'))

const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.list = async (event, context) => {

    const params = {
        TableName : process.env.DYNAMO_DB_PLANET_TABLE
    }
    try {
        const data = await dynamoDb.scan(params).promise()
        
        return { statusCode : 200, body : JSON.stringify({data : data.Items , count : data.Count}) }
    } catch (error) {
        return { statusCode : 400, body : JSON.stringify(error)}        
    }
};

module.exports.create = async (event, context) => {
    const data = JSON.parse(event.body)
    const planet = model(data)

    const params = {
        TableName: process.env.DYNAMO_DB_PLANET_TABLE,
        Item: planet
    }

    try {
        const result = await dynamoDb.put(params).promise();
        return { statusCode: 201, body: JSON.stringify(planet) };
    } catch (error) {
        return {
            statusCode: 400,  
            body: JSON.stringify(error)
        }
    }
};

module.exports.detail = async (event, context) => {
    const id = event.pathParameters.id

    const params = {
        TableName : process.env.DYNAMO_DB_PLANET_TABLE,
        Key : {
            id : id
        }
    }

    try {
        const data = await dynamoDb.get(params).promise()
        return {
            statusCode : 200,
            body : JSON.stringify(data.Item)
        }
    } catch (error) {
        return { statusCode : 400, body : JSON.stringify(error)}
    }

};

module.exports.update = async event => {
    const {name} = JSON.parse(event.body)
    console.log(name)
    const params = {
        TableName: process.env.DYNAMO_DB_PLANET_TABLE,
        Key : {
            id : event.pathParameters.id,
        },
        UpdateExpression : "set nombre =:name",
        ExpressionAttributeValues : {
            ":name" : name
        }
    }

    try {
        const result = await dynamoDb.update(params).promise()
        return { statusCode : 200, body : JSON.stringify(result.Attributes) } 
    } catch (error) {
        return { statusCode : 400, body : JSON.stringify(error) } 
    }
};


module.exports.delete = async event => {
    const { id } = event.pathParameters

    const params = {
        TableName : process.env.DYNAMO_DB_PLANET_TABLE,
        Key : {
            id : id
        }
    }
    try {
        const data = await dynamoDb.delete(params).promise()
        return {
            statusCode : 204,
            body : JSON.stringify(data)
        }
    } catch (error) {
        return { statusCode : 400, body : JSON.stringify(error)}
    }
};
  