'use strict'

const connectDb = require('./db')
const { ObjectId } = require('mongodb')
const errorHandler = require('./errorHandler')
const  { coursesCollectionName, studentsCollectionName} = require('./constants')

module.exports = {
  courses: async () => {
    let db
    let courses = []

    try {
      db = await connectDb()
      courses = await db.collection(coursesCollectionName).find({}).toArray()
    } catch (error) {
      errorHandler(error)
    }
    return courses
  },
  course: async (_, { id }) => {
    let db
    let course

    try {
      db = await connectDb()
      course = await db.collection(coursesCollectionName).findOne({ _id: ObjectId(id) })
    } catch(error) {
      errorHandler(error)
    }
    return course
  },
  students: async () => {
    let db
    let students = []

    try {
      db = await connectDb()
      students = await db.collection(studentsCollectionName).find({}).toArray()
    } catch (error) {
      errorHandler(students)
    }
    return students
  },
  student: async (_, { id }) => {
    let db
    let student

    try {
      db = await connectDb()
      student = await db.collection(studentsCollectionName).findOne({ _id: ObjectId(id) })
    } catch(error) {
      errorHandler(error)
    }
    return student
  }
}
