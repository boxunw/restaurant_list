const mongoose = require('mongoose')

// setting connection to mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

// get the database connection status
const db = mongoose.connection
// connection error
db.on('error', () => {
  console.log('mongodb error!')
})
// connection established
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db