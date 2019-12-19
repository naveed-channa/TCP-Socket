"use strict";
const response = require('../config/response');
const UserModel = require('../models/User');
const SocketClient = require('../config/socket');

class AuthController {
  constructor(socket) {
    this.socket = socket;
    this.response = response;
  }
  async login(data , socket) {
    if(data.authentication_token){
      let user = await UserModel.getByToken(data.authentication_token);
      if (user.length > 0) {
          SocketClient.login(user[0].id , socket);
          await response.Success(user[0] , false , user[0].id , data.action);
      } else {
        response.Error([], false, 'login' , socket);
      }
    }else{
      response.Error([], false, 'login' , socket);
    }
  }

}

module.exports = AuthController;