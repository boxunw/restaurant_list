// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const Restaurant = require('./models/restaurant')
const restaurant = require('./models/restaurant')

// only use dotenv in non-production environments
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// setting connection to mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Get the database connection status
const db = mongoose.connection
// Connection error
db.on('error', () => {
  console.log('mongodb error!')
})
// Connection established
db.once('open', () => {
  console.log('mongodb connected!')
})

// Each request needs to be pre-processed using body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// routes setting
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  return Restaurant.find({})
    .lean()
    .then(restaurantList => {
      const restaurants = restaurantList.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.category.includes(keyword.trim())
      })
      if (restaurants.length === 0) {
        res.render('index', { error: `您輸入的關鍵字：${keyword} 沒有符合條件的餐廳`, keyword })
        return
      }
      res.render('index', { restaurants, keyword })
    })
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})