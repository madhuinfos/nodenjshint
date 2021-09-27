const express = require('express');
const helmet = require('helmet');
const Joi = require('joi');

const logger = require('./logger');
const app = express();
app.use(express.json());

const courseSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
});

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
];

app.use(helmet());

app.use((req, res, next) => {
  logger.log(`HTTP Method: ${req.method} and URL : ${req.url}`);
  next();
});

app.get('/api/courses', async (req, res) => {
  logger.log(`Get all courses ${req.url}`);
  getDataWithCallback((data) => console.log(data));
  getDataWithPromise().then((result) => console.log(result));

  const result = await getDataWithPromise();
  console.log(result);
  res.status(200).send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((x) => x.id === parseInt(req.params.id));
  if (course) {
    return res.status(200).send(course);
  }

  res.sendStatus(404);
});

app.post('/api/courses', (req, res) => {
  const { error, value } = courseSchema.validate(req.body);

  if (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);

  res.status(200).send(course);
});

function getDataWithCallback(callback) {
  callback({ name: 'user', program: 'hello world' });
}

function getDataWithPromise() {
  return new Promise((resolve, reject) => {
    resolve({ name: 'user', program: 'hello world' });
  });
}

const portNo = process.env.PORT || 2000;

app.listen(portNo, () => console.log(`listening on port ${portNo}`));
