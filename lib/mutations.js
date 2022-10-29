'use strict'

const { ObjectId } = require('mongodb')
const connectDb = require('./db')
const errorHandler = require('./errorHandler')

const coursesCollectionName = 'courses'
const studentsCollectionName = 'students'

module.exports = {
  course: async(_, { input }) => {
    const defaults = {
      teacher: '',
      topic: ''
    }
    const newCourse = Object.assign(defaults, input)

    let db

    try {
      db = await connectDb()
      const course = await db.collection(coursesCollectionName).insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      errorHandler(error)
    }
    return newCourse
  },
  student: async(_, { input }) => {

    let db

    try {
      db = await connectDb()
      const student = await db.collection(studentsCollectionName).insertOne(input)
      input._id = student.insertedId
    } catch (error) {
      errorHandler(error)
    }
    return input
  },
  deleteCourse: async(_, { id }) => {
    let db

    try {
      db = await connectDb()
      await db.collection(coursesCollectionName).deleteOne({ _id: ObjectId(id) })
    } catch(error) {
      errorHandler(error)
      return false
    }
    return true
  },
  editCourse: async(_, { id, input }) => {
    let db
    let course

    try {
      db = await connectDb()
      await db.collection(coursesCollectionName).updateOne(
        { _id: ObjectId(id) },
        { $set: input }
      )
      course = await db.collection(coursesCollectionName).findOne(
        { _id: ObjectId(id) }
      )
    } catch (error) {
      errorHandler(error)
    }
    return course
  },
  editStudent: async(_, { id, input }) => {
    let db
    let student

    try {
      db = await connectDb()
      await db.collection(studentsCollectionName).updateOne(
        { _id: ObjectId(id) },
        { $set: input }
      )
      student = await db.collection(studentsCollectionName).findOne(
        { _id: ObjectId(id) }
      )
    } catch (error) {
      errorHandler(error)
    }
    return student
  },
  assignStudent: async (_, { courseId, studentId }) => {
    let db
    let student
    let course

    try {
      db = await connectDb()

      course = await db.collection(coursesCollectionName).findOne(
        { _id: ObjectId(courseId) }
      )
      student = await db.collection(studentsCollectionName).findOne(
        { _id: ObjectId(studentId) }
      )

        if (!course || !student) throw new Error(`Course or Stundent doesn't exists`)

      course = await db.collection(coursesCollectionName).updateOne(
          { _id: ObjectId(courseId) },
          { $addToSet: { students: ObjectId(studentId) } }
        )

    } catch (error) {
      errorHandler(error)
    }
    return course
  },
  deleteStudent: async(_, { id }) => {
    let db

    try {
      db = await connectDb()
      await db.collection(studentsCollectionName).deleteOne({ _id: ObjectId(id) })
    } catch(error) {
      errorHandler(error)
      return false
    }
    return true
  }
}
