'use strict'
const courses = [
  {
    _id: 'anyid1',
    title: 'My Title 1',
    teacher: 'My Teacher 1',
    description: 'Description 1',
    topic: 'Engineering'
  },
  {
    _id: 'anyid2',
    title: 'My Title 2',
    teacher: 'My Teacher 2',
    description: 'Description 2',
    topic: 'Mathemathics'
  },
  {
    _id: 'anyid3',
    title: 'My Title 3',
    teacher: 'My Teacher 3',
    description: 'Description 3',
    topic: 'Society'
  }
]

module.exports = {
  getCourses: () => courses
}
