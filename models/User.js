"use strict";

const db = require('../config/database');

class User {
    constructor() {
        this.db = db;
        this.table = 'users'
    }
    async getByToken(token) {
        let data = await this.db.select().table(this.table).where('authentication_token', token);
        if(data.length>0){
            return data;
        }else{
            return [];
        }
    }

    async getByUserId(id) {
        let data = await this.db.select().table(this.table).where('id', id);
        if(data.length>0){
            return data;
        }else{
            return [];
        }
    }
}
let usr = new User();
module.exports = usr;