require('dotenv').config();
const {printEnv} = require('./test')
const {DOMAIN_NAME} = process.env
// printEnv()
console.log(DOMAIN_NAME)