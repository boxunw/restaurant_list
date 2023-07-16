const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')

// 使用者登入路由
router.get('/login', (req, res) => {
  res.render('login')
})

// 驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// 使用者註冊路由
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊使用者資訊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User already exists.')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
    .catch(err => console.log(err))
})

module.exports = router