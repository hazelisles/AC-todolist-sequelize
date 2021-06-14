const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/:id', (req, res) => {
  const { id } = req.params
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const UserId = req.user.id
  const { id } = req.params
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const UserId = req.user.id
  const { id } = req.params
  const { name, isDone } = req.body
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === "on"
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const UserId = req.user.id
  const { id } = req.params
  return Todo.destroy({ where: { id, UserId } })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router