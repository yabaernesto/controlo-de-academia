const { response } = require('express')
const { age, date } = require('./utils')

// create
exports.post = (request, response) => {
  const keys = Object.keys(request.body)
  for (key of keys) {
    if (request.body.key == '') {
      return response.send('Please, fill all fields!')
    }
  }
}

// show
exports.show = (request, response) => {
  const { id } = request.params
  const foundInstructor = data.instructor.find((instructor) => {
    return instructor.id == id
  })

  if (!foundInstructor) 
    return response.send('Instructor not found!')

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth)
  }

  return response.render('instructors/show', { instructor: foundInstructor })
}

// edit
exports.edit = (request, response) => {
  const { id } = request.params
  const foundInstructor = data.instructor.find((instructor) => {
    return instructor.id == id
  })

  if (!foundInstructor) 
    return response.send('Instructor not found!')

  date(foundInstructor.birth)

  return response.render('instructors/edit', { instructor: foundInstructor })
}

// put
exports.put = (request, response) => {
  const { id } = request.body
  let index = 0

  const foundInstructor = data.instructor.find((instructor, foundIndex) => {
    if (id === instructor.id) {
      index = foundIndex
      return true
    }
  })

  if (!foundInstructor) return response.send('Instructor not found')

  const instructor = {
    ...foundInstructor,
    ...request.body,
    birth: Date.parse(request.body.birth)
  }

  data.instructors[index] = instructor
}

// delete
exports.delete = (request, response) => {
  const { id } = request.body
  
}