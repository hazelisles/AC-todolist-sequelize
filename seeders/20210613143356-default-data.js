'use strict'
const bcrypt = require('bcryptjs')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: bcrypt.hashSync(SEED_USER.password, bcrypt.genSaltSync(10), null),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
      .then(userId => queryInterface.bulkInsert('Todos', Array.from({ length: 10 }).map((_, i) => ({
        name: `task-${i}`,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      ), {}))
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([queryInterface.bulkDelete('Todos', null, {}), queryInterface.bulkDelete('Users', null, {})])
  }
};
