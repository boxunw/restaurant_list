const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 設定路由
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  req.body.userId = userId
  // 處理新增餐廳流程中的錯誤訊息
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  const new_error = {}
  if (!name || !category || !image || !location || !phone || !google_map || !rating || !description) {
    new_error.message = '請完成所有必填欄位！'
  }
  if (Object.keys(new_error).length) {
    return res.render('new', {
      new_error,
      name,
      name_en,
      category,
      image,
      location,
      phone,
      google_map,
      rating,
      description
    })
  }
  // 新增餐廳到資料庫
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.updateOne({ _id, userId }, req.body)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router