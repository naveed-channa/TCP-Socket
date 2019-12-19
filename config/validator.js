"use strict";

const Joi = require('joi'); 
const schema = require('./schema');

class Validator {

    async Validation(params , action){
        return new Promise(function(resolve , reject){
            schema[action].validate(params, {abortEarly: false}) //abortEarly - collect all errors not just the first one
            .then(validatedUser => {
                resolve([]);
            })
            .catch(validationError => {
                const errorMessage = validationError.details.map(d => d.message);
                var obj = {};
                errorMessage.forEach(function(value, index) {
                    value = value.replace(/["']/g, "")
                    obj[parseInt(index)] = value;
                });
                resolve([obj]);
            });
        }) 
    }

}
var Valid = new Validator();
module.exports = Valid;