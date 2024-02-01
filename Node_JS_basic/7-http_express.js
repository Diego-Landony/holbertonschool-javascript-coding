const express = require('express');
const fs = require('fs');
const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const database = process.argv[2];
  const fields = ['firstname', 'lastname', 'age', 'field'];
  const validFields = ['firstname', 'lastname', 'age', 'field'];
  const validFieldsSet = new Set(validFields);
  const validFieldsString = validFields.join(', ');
  const students = [];

  if (!database) {
    res.status(500).send('Database file not specified');
    return;
  }

  fs.readFile(database, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Cannot load the database');
      return;
    }

    const lines = data.trim().split('\n');

    for (const line of lines) {
      const values = line.split(',');
      const student = {};

      for (let i = 0; i < values.length; i++) {
        const field = fields[i];
        const value = values[i].trim();

        if (validFieldsSet.has(field)) {
          student[field] = value;
        }
      }

      if (Object.keys(student).length === validFields.length) {
        students.push(student);
      }
    }

    const nbStudents = students.length;
    const csStudents = students.filter(s => s.field === 'CS');
    const sweStudents = students.filter(s => s.field === 'SWE');
    const nbCsStudents = csStudents.length;
    const nbSweStudents = sweStudents.length;
    const csStudentsList = csStudents.map(s => s.firstname).join(', ');
    const sweStudentsList = sweStudents.map(s => s.firstname).join(', ');
    const response = `This is the list of our students\nNumber of students: ${nbStudents}\nNumber of students in CS: ${nbCsStudents}. List: ${csStudentsList}\nNumber of students in SWE: ${nbSweStudents}. List: ${sweStudentsList}`;

    res.send(response);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
