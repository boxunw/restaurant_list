const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const bodyParser = require('body-parser')
// 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')
const app = express()
const port = 3000

// 啟用樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 啟用並設定 express-session
app.use(session({
  secret: 'ThisIsNotASecret',
  resave: false,
  saveUninitialized: true
}))

// 使用靜態檔案
app.use(express.static('public'))

// 每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app
usePassport(app)

// 掛載 connect-flash
app.use(flash())

// 設定本地變數 res.locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error = req.flash('error')
  next()
})

// 將 request 導入路由器
app.use(routes)

// 啟動並監聽伺服器
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})