const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 設定路由
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
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

module.exports = router