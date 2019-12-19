"use strict";
const exportss = require('../config/exports');
const validator = require('../config/validator');
const response = require('../config/response');
class Routes {
    
    async Action(data , socket) {
      try{
          if(data.action){
            var act = exportss[data.action];
            var newAction = act.action;
            var controllerName = act.controller;
            let Contr = require('../controllers/'+controllerName);
            let vld = await validator.Validation(data , data.action);
            if(vld.length<=0){
              let Ctl = new Contr();
              let act = Ctl[newAction];
              await act(data , socket);
            }else{
              console.log("validation_error" , vld);
              response.Error(vld, vld.user_id, 'validation_error' , socket);
            }
          }else{
            console.log("Action not found");
            response.Error(vld, vld.user_id, 'validation_error' , socket);
          }
      }catch(err){
        console.log("Catch error " , err);
        response.Error(data, [], 'validation_error' , socket);
      }
            
    }
}
  
var Rout = new Routes();
module.exports = Rout;