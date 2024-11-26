const mongoose = require('mongoose')

const dotenv = require('dotenv')

dotenv.config({ path: '.env' })

const DB =process.env.MONGO_URI
const dbConnect = () => {
    mongoose.connect(DB)
        .then(() => {
            console.log('DB Conected')
        }).catch(() => {
            console.log('Problem in Connection DB')
        })
}


module.exports = dbConnect