'use strict'

const connectDb = require('./db')
const { ObjectId } = require('mongodb')
const errorHandler = require('./errorHandler')
const  { coursesCollectionName, peopleCollectionName} = require('./constants')

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
  people: async () => {
    let db
    let people = []

    try {
      db = await connectDb()
      people = await db.collection(peopleCollectionName).find({}).toArray()
    } catch (error) {
      errorHandler(people)
    }
    return people
  },
  person: async (_, { id }) => {
    let db
    let person

    try {
      db = await connectDb()
      person = await db.collection(peopleCollectionName).findOne({ _id: ObjectId(id) })
    } catch(error) {
      errorHandler(error)
    }
    return person
  },
  searchItems: async (_, { keyword }) => {
    let db
    let items
    let courses
    let people

    try {
      db = await connectDb()
      courses = await db.collection(coursesCollectionName).find(
        { $text: { $search: keyword } }
      ).toArray()
      people = await db.collection(peopleCollectionName).find(
        { $text: { $search: keyword } }
      ).toArray()

      items = [...courses, ...people]
    } catch(error) {
      errorHandler(error)
    }
    return items
  }
}
