"use strict";

let Response = {};
Response = {

  SuccessMessages: async function(){

          return {
            login: "You have successfully loged in.",
            getDrivers:"Drivers found successfully",
            RequestRide:"Request ride successfully"
          }
  },

  ErrorMessages: async function () {
          return {
            login: "You have not successfully loged in.",
            token_not_found:"Authentication token not found.",
            driver_not_found:"Driver not find in this area",
            validation_error:"Invalid inputs please verify again!",
            server_error:"Some thing went wrong :)",
            clinet_not_found:"Clinet not found please login again :("
          }
  },

  getSuccessMessage: async function(action){
          let messages =  await this.SuccessMessages();
          return messages[action];
  },


  getErrorMessage: async function(action) {
          let messages =  await this.ErrorMessages();
          return messages[action];
  },
  
  Success:  async function (data , collection , id , action , socket) {
          const resource = require('./resources');
          let fn = resource[action];
          if(Object.keys(data).length>0){
                var newData = await fn(data , collection);
          }else{
                var newData = []
          }
          
          var resp = {
            status:true,
            code:200,
            data:newData,
            message:await this.getSuccessMessage(action),
            action:action
          }  
          let getSocket = require('../config/socket');
          let sock = getSocket.get_by_id(id);
          if(typeof sock!='undefined')
                sock.sock.write(JSON.stringify(resp)+'\r\n');
          else{
                resp.msg = "Client not found";
                resp.code = 400;
                socket.write(JSON.stringify(resp)+'\r\n');
          }
  },

  Error : async function (data , id , action , socket) {
        let msg = await this.getErrorMessage(action)
        let resp = {
            status:false,
            code:400,
            data:data,
            message:msg,
            action:action
        }
        let getSocket = require('../config/socket');
        if(id && typeof sock!="undefined"){
            var sock = getSocket.get_by_id(id);
            sock.sock.write(JSON.stringify(resp));
        }else{
            resp.msg = "Client not found";
            socket.write(JSON.stringify(resp));
        }
  }

}
module.exports = Response;