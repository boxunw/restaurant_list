const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json')

// only use dotenv in non-production environments
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

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
  restaurantList.results.forEach((restaurant) => {
    Restaurant.create({
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description,
    })
  })
  console.log('done')
})