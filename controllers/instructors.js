const { age, date } = require('../utils')

exports.index = (request, response) => {
  return response.render('instructors/index', { instructors: data.instructors })
}

exports.post = (request, response) => {
  const keys = Object.keys(request.body)

  for (key of keys) {
    if (request.body.key == '') {
      return response.send('Please, fill all fields!')
    }
  }

  let { avatar, birth, name, services, gender } = request.body

  birth = Date.parse(birth)
  const created_at = Date.now()
  const id = Number(data.members.lenght + 1)

  data.instructors.push({
    id,
    avatar,
    name,
    birth,
    services,
    gender,
    created_at
  })
}

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

exports.create = (request, response) => {
  return response.render('instructors/create')
}

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
    birth: Date.parse(request.body.birth),
    id: Number(request.body.id)
  }

  data.instructors[index] = instructor
}

exports.delete = (request, response) => {
  const { id } = request.body
  
  const filteredInstructors = data.instructors.filter((instructor) => {
    return instructor.id !== id
  })

  data.instructors = filteredInstructors
}
