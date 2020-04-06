const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
]
app.get('/', (req, res) => {
    res.send('hello world')
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

// PORTS 

// /api/courses/1
// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id);
// })
// app.get('/api/courses/:year/:month', (req, res) => {
//     res.send(req.params);
// })

app.get('/api/courses/:id',(req,res) =>{
    const course = courses.find(c => c.id == parseInt(req.params.id));
    console.log(course)
    if(!course) {//404 {
        res.status(400).send('The course for the given id not found');
    }
    else {
        res.send(course);
    }
})

app.post('/api/courses/', (req, res) => {

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    console.log(result)
    // console.log(result);
    // if(!req.body.name || req.body.name.length < 3){
    //     res.status(400).send('name is requred min 3 characters');
    //     return;
    // }
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id:courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id == parseInt(req.params.id));
    console.log(course)
    if(!course) {//404 {
        res.status(400).send('The course for the given id not found');
    }
    // if not existing , return 404 

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    // validate 
    // if invalid, return 400 - Bad request
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    // Update course 
    course.name = req.body.name;
    res.send(course);
    // Return the updated course
});

app.delete('/api/courses/:id', (req, res) => {
    // Look up the course 
    // does not eist 404
    const course = courses.find(c => c.id == parseInt(req.params.id));
    console.log(course)
    if(!course) {//404 {
        res.status(400).send('The course for the given id not found');
    }
    // delete
    const index = courses.indexOf(course);

    courses.splice(index, 1);

    res.send(course);
    //return the same course
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on Port ${port}`))
