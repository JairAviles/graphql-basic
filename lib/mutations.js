'use strict'

const connectDb = require('./db')
const errorHandler = require('./errorHandler')

const collectionName = 'courses'

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
      const course = await db.collection(collectionName).insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      errorHandler(error)
    }
    return newCourse
  }
}
