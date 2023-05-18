const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')

// show 
exports.show = (request, response) => {
  const { id } = request.params 

  const foundInstructor = data.instructors.find((instructor) => {
    return instructor.id == id
  })

  if (!foundInstructor) return response.send('Instructor not found!')

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(','),
    created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at)
  }

  return response.render('instructors/show', { instructor })
}

// create
exports.post = (request, response) => {
  const keys = Object.keys(request.body)
  
  for (key of keys) {
    if (request.body[key] == '') {
      return response.send('Please, fill all fields!')
    }
  }

  let { avatar, name, birth, gender, services } = request.body
  
  birth = Date.parse(birth)
  const created_at = Date.now()
  const id = Number(data.instructors.length + 1)

  data.instructors.push({
    avatar,
    name,
    birth,
    gender,
    services,
    created_at,
    id
  })

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if (err) return response.send('Write file error!')
    
    return response.redirect('/instructors')
  })

  // return response.send(request.body)
}

// edit
exports.edit = (request, response) => {
  const { id } = request.params 

  const foundInstructor = data.instructors.find((instructor) => {
    return instructor.id == id
  })

  if (!foundInstructor) return response.send('Instructor not found!')

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth)
  }

  return response.render('instructors/edit', { instructor }) 
}