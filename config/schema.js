"use strict";

const Joi = require('joi') 
const schemas = { 
  login: Joi.object().keys({ 
    authentication_token: Joi.string().required(),
    action: Joi.string().required()
  }), 
  // define all the other schemas below 
}; 
module.exports = schemas;