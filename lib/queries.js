'use strict'

const connectDb = require('./db')
const { ObjectId } = require('mongodb')
const errorHandler = require('./errorHandler')

const collectionName = 'courses'

module.exports = {
  courses: async () => {
    let db
    let courses = []

    try {
      db = await connectDb()
      courses = await db.collection(collectionName).find({}).toArray()
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
      course = await db.collection(collectionName).findOne({ _id: ObjectId(id) })
    } catch(error) {
      errorHandler(error)
    }
    return course
  }
}
