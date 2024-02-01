import { readDatabase } from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const data = await readDatabase(req.params.filename);
      res.status(200).send(`This is the list of our students\nNumber of students: ${data.students.length}\nNumber of students in CS: ${data.csStudents.length}. List: ${data.csStudents.join(', ')}\nNumber of students in SWE: ${data.sweStudents.length}. List: ${data.sweStudents.join(', ')}`);
    } catch (err) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    try {
      const data = await readDatabase(req.params.filename);
      const { major } = req.params;
      if (major !== 'CS' && major !== 'SWE') {
        res.status(500).send('Major parameter must be CS or SWE');
        return;
      }
      const students = data[major.toLowerCase() + 'Students'];
      res.status(200).send(`List: ${students.join(', ')}`);
    } catch (err) {
      res.status(500).send('Cannot load the database');
    }
  }
}
