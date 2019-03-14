'use strict';
//Don't forget to require Sequlize and database up top!!!
const Sequelize = require('sequelize');
const db = require('../db');


const Student = db.define('student', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
})

Student.beforeCreate((studentInstance) => {
 let nameFirst = studentInstance.firstName;
 let nameLast = studentInstance.lastName;

 studentInstance.firstName = nameFirst[0].toUpperCase() + nameFirst.slice(1);
 studentInstance.lastName = nameLast[0].toUpperCase() + nameLast.slice(1);
})







/*
const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    // validate: {
    //   is: /[\w]+/,
    // },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    // validate: {
    //   is: /[\w]+/,
    // },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

Student.beforeCreate(student => {
  const nameFirst = student.firstName;
  const nameLast = student.lastName;

  student.firstName = nameFirst[0].toUpperCase() + nameFirst.slice(1);
  student.lastName = nameLast[0].toUpperCase() + nameLast.slice(1);
});
*/
module.exports = Student;
