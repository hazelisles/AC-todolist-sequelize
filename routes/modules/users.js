const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../../models')
const User = db.User

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ msg: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ msg: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors, name, email, password, confirmPassword
    })
  }
  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        errors.push({ msg: '此 Email 已經註冊過了。' })
        return res.render('register', {
          errors, name, email, password, confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(hash => User.create({
          name, email, password: hash
        }))
        .then(() => {
          const success = { msg: '註冊成功！' }
          res.render('login', { success })
        })
        .catch(err => console.log(err))
    })
})

router.get('logout', (req, res) => {
  res.send('logout')
})

module.exports = router