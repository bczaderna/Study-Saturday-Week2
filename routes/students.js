const router = require('express').Router();

const Student = require('../db/models/student');
//eveything that starts with /students is going here automatically...


router.get('/', async (req, res, next) => {
    try {
      const allStudents = await Student.findAll();
      res.status(200).send(allStudents);
    } catch (error) {
        next(error);
    }
})

router.get('/:id', async (req, res, next) => {
  try {
    let searchedForStudent = await Student.findById(req.params.id);

    if (searchedForStudent) {
      res.status(200).send(searchedForStudent);
    }
    else {
      res.sendStatus(404)
    };

  } catch (error) {
      next(error);
  }
})

//creates a new student instance
router.post('/', async (req, res, next) => {
  try {
   let newPost = await Student.create(req.body);

   res.status(201).send(newPost);

  } catch (error){
        next(error);
  }
})

//updates an instance of a student
//REMEMBER THAT WITH UPDATES you only want to return the first index...
//.update(arg1, arg2) ==> arg1 is what you want to update to. arg2 is where in the database to make that update.
//using object destructuring!
router.put('/:id', async (req, res, next) => {
  try {
    let [numberOfAffectedRows, updatedStudent] = await Student.update(req.body,{
      where: { id: req.params.id},
      returning: true,
      plain: true,
    })

    res.status(200).send(updatedStudent);
  } catch (error) {
      next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
    try {
      
      Student.destroy({
        where: {
          id: req.params.id
        }
      });
      res.status(204).send();
    } catch (error) {
       next(error);
    }
})















/*
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    let student = await Student.findById(req.params.id);
    if (student) {
      res.send(student);
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let student = await Student.create(req.body);
    res.status(201).send(student);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    let updatedStudentInfo = await Student.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      plain: true,
    });
    res.send(updatedStudentInfo[1]);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Student.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
*/
module.exports = router;
