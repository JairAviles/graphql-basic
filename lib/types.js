'use strict'

const { ObjectId } = require('mongodb')
const connectDb = require('./db')
const errorHandler = require('./errorHandler')

const studentsCollectionName = 'students'

module.exports = {
  Course: {
    students: async ({ students }) => {
      let db
      let studentData
      let ids

      try {
        db = await connectDb()
        ids = students ? students.map( id => ObjectId(id)) : []
        studentData = ids.length > 0
          ? await db.collection(studentsCollectionName).find(
            { _id: { $in: ids } }
          ).toArray() : []
      } catch (error) {
        errorHandler(error)
      }

      return studentData
    }
  }
}
