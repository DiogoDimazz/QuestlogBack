// const knex = require('knex')({
//     client: 'pg',
//     connection: {
//         host:
//         user:
//         password:
//         database:
//         ssl: {
//             rejectUnauthorized: false
//         }
//     }
// })

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'postgres',
        port: 5432,
        database: 'questlog'
    }
})

module.exports = knex;