'use strict'

const { ObjectId } = require('mongodb')
const connectDb = require('./db')
const errorHandler = require('./errorHandler')
const  { peopleCollectionName } = require('./constants')

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
          ? await db.collection(peopleCollectionName).find(
            { _id: { $in: ids } }
          ).toArray() : []
      } catch (error) {
        errorHandler(error)
      }

      return studentData
    }
  },
  Person: {
    __resolveType: (person, context, info) => {
      if (person.phone) {
        return 'Monitor'
      }
      return 'Student'
    }
  },
  GlobalSearch: {
    __resolveType: (item, context, info) => {
      if (item.title) {
        return 'Course'
      }

      if (item.phone) {
        return 'Monitor'
      }

      return 'Student'
    }
  }
}
