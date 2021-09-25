const express = require('express');
const logger = require('./logger');
const app = express();

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
];

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
