const express = require('express')
const router = express.Router()

const users = require('./modules/users')
const home = require('./modules/home')
const todos = require('./modules/todos')

router.use('/users', users)
router.use('/todos', todos)
router.use('/', home)

module.exports = router