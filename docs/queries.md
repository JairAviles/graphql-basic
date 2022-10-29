# Sample queries

## Aliases and Fragments

```graphql
{
  AllCourses: courses {
    ...CourseFields
    students {
      _id
      name
      email
    }
  }

  AllStudents: students {
    _id
    name
    email
  }

  Course1: course(id: "_id1") {
    ...CourseFields
    teacher
  }

  Course2: course(id: "_id2") {
    ...CourseFields
    topic
  }
}

fragment CourseFields on Course {
  _id
  title
  description
  students {
    _id
    name
  }
}
```
