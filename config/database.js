const options = {
    client: 'mysql',
    connection: {
        host: '0.0.0.0',
        port: '3306',
        user: 'root',
        password: '',
        database: 'tcp'
    }
}

const knex = require('knex')(options);

module.exports = knex;