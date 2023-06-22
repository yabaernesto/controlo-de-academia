const { age, date } = require('../utils')

exports.index = (request, response) => {
  return response.render('members/index', { members: data.members })
}

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
  const foundMember = data.member.find((member) => {
    return member.id == id
  })

  if (!foundMember) 
    return response.send('Member not found')

  const member = {
    ...foundMember,
    age: age(foundMember.birth)
  }

  return response.render('members/show', { member: foundMember })
}

// edit
exports.edit = (request, response) => {
  const { id } = request.params
  const foundMember = data.member.find((member) => {
    return member.id == id
  })

  if (!foundMember) 
    return response.send('Member not found')

  date(foundMember.birth)

  return response.render('members/edit', { member: foundMember })
}

// put
exports.put = (request, response) => {
  const { id } = request.body
  let index = 0

  const foundMember = data.member.find((member, foundIndex) => {
    if (id === member.id) {
      index = foundIndex
      return true
    }
  })

  if (!foundMember) return response.send('Member not found')

  const member = {
    ...foundMember,
    ...request.body,
    birth: Date.parse(request.body.birth),
    id: Number(request.body.id)
  }

  data.members[index] = member
}

// delete
exports.delete = (request, response) => {
  const { id } = request.body
  
  const filteredMembers = data.members.filter((member) => {
    return member.id !== id
  })

  data.members = filteredMembers
}
