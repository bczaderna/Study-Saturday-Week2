'use strict';
const Sequelize = require('sequelize');
const db = require('../db');
const Student = require('../models/student')


const Test = db.define('test', {
    subject: {
      type: Sequelize.STRING,
      allowNull: false
    },
    grade: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
})

Test.belongsTo(Student, {as: 'student'});





/*
const Test = db.define('test', {
  subject: {
    type: Sequelize.STRING,
    allowNull: false,
    // validate: {
    //   id: /[\w]+/,
    // },
  },
  grade: {
    type: Sequelize.INTEGER,
    allowNull: false,
    // validate: {
    //   isNumeric: true,
    // },
  },
});

Test.belongsTo(Student, { as: 'student' });
*/
module.exports = Test;
