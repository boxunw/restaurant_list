// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// only use dotenv in non-production environments
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const routes = require('./routes')
const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

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

// each request needs to be pre-processed using body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// each request will undergo pre - processing through methodOverride
app.use(methodOverride('_method'))

// route the request to the router
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})