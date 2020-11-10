const express = require('express')
const app = express()
const students = require('./students.json')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// GET /students - returns a list of all students
// this endpoint, optionally, accepts query parameters
// GET /students?search=<query> - returns a list of students filtered on name matching the given query
app.get('/students', (req, res) => {
    res.send(students)
})

// GET /students/:studentId - returns details of a specific student by student id
app.get('/students/:studentId', (req, res) => {
    res.send(students.find((student) => {
        return +req.params.studentId === student.studentId
    }))
})

// GET /grades/:studentId - returns all grades for a given student by student id
app.get('/grades/:studentId', (req, res) => {
    students.find((student) => {
        +req.params.studentId === student.studentId ? 
        res.send(student.grades) :
        false
    })
    
})

// POST /grades - records a new grade, returns success status in JSON response (meaning you do not need to actually store the grade in a database. You do need to validate that the user supplied at least a grade, and a studentId)
app.put('/grades', (req, res) => {
    students.find((student) => {
        if (+req.body.studentId === student.studentId) {
            res.send(req.body.grades)
            console.log(`Student ${req.body.studentId} earned a ${req.body.grades[req.body.grades.length - 1]}!`)
        } else {
            console.log('Please specify a user ID to add grade')
        }
    })
    
})

// POST /register - creates a new user, returns success status in JSON response (meaning you do not need to actually store the user info in a database. You do need to validate that the user supplied username and email)
app.post('/register', (req, res) => {
    if (req.body.username && req.body.email) {
        res.send(req.body)
        console.log(`New user added! Username: ${req.body.username} Email: ${req.body.email}`)
    } else {
        console.log('Please provide a username and email')
    }
})

const port = 3000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))