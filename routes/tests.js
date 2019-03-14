const router = require('express').Router();
//don't forget to require your test model!
const Test = require('../db/models/test');
const Student = require('../db/models/student');

router.get('/', async(req, res, next) => {
    try {
        let tests = await Test.findAll();
        res.status(200).send(tests);
    } catch (error){
        next(error);
    }
})

router.get('/:id', async(req, res, next) => {
    try {
        let test = await Test.findById(req.params.id);
        res.status(200).send(test);
    } catch (error){
        next(error);
    }
})

//creates a new test instance for a student
router.post('/student/:studentId', async(req, res, next) => {
    
    try {
        const newTest = await Test.create({
            subject: req.body.subject,
            grade: req.body.grade
        })

        const student = await Student.findById(req.params.studentId);

        newTest.setStudent(student);

        res.status(201).send(newTest);
        
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', async(req, res, next) => {
    try {
    Test.destroy({ where: { id: req.params.id}})
    res.status(204).send()
    } catch (error){
        next(error)
    }
} )
module.exports = router;
