'use strict'

const { ObjectId } = require('mongodb')
const connectDb = require('./db')
const errorHandler = require('./errorHandler')
const  { coursesCollectionName, peopleCollectionName} = require('./constants')

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
  person: async(_, { input }) => {

    let db

    try {
      db = await connectDb()
      const person = await db.collection(peopleCollectionName).insertOne(input)
      input._id = person.insertedId
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
  editPerson: async(_, { id, input }) => {
    let db
    let person

    try {
      db = await connectDb()
      await db.collection(peopleCollectionName).updateOne(
        { _id: ObjectId(id) },
        { $set: input }
      )
      person = await db.collection(peopleCollectionName).findOne(
        { _id: ObjectId(id) }
      )
    } catch (error) {
      errorHandler(error)
    }
    return person
  },
  assignPerson: async (_, { courseId, studentId }) => {
    let db
    let person
    let course

    try {
      db = await connectDb()

      course = await db.collection(coursesCollectionName).findOne(
        { _id: ObjectId(courseId) }
      )
      person = await db.collection(peopleCollectionName).findOne(
        { _id: ObjectId(studentId) }
      )

        if (!course || !person) throw new Error(`Course or Stundent doesn't exists`)

      course = await db.collection(coursesCollectionName).updateOne(
          { _id: ObjectId(courseId) },
          { $addToSet: { students: ObjectId(studentId) } }
        )

    } catch (error) {
      errorHandler(error)
    }
    return course
  },
  deletePerson: async(_, { id }) => {
    let db

    try {
      db = await connectDb()
      await db.collection(peopleCollectionName).deleteOne({ _id: ObjectId(id) })
    } catch(error) {
      errorHandler(error)
      return false
    }
    return true
  }
}
