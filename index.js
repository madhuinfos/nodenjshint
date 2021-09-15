const express = require('express');
const logger = require('./logger');
const app = express();

const courses = [{id: 1, name: 'course1'}, {id:2, name:'course2'}];

app.get('/api/courses', (req, res) => {
    logger.log(`Get all courses ${req.url}`);
    res.status(200).send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    
    const course = courses.find(x => x.id === parseInt(req.params.id));
    if(course){
        return res.status(200).send(course);
    }

    res.sendStatus(404);
});
const portNo = 2000;

app.listen(portNo, () => console.log(`listening on port ${portNo}`));