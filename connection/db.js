//import postgres pool
const {Pool} =require('pg')
const { postgresMd5PasswordHash } = require('pg/lib/utils')

//set connection pool
const dbPool = new Pool({
    database : 'personal-web',
    port : 5432,
    user : 'postgres',
    password : 'asd'
})

// export db pool
module.exports = dbPool