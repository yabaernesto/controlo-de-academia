const { age, date } = require('../utils')

exports.index = (request, response) => {
  return response.render('members/index', { members: data.members })
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

  data.members.push({
    id,
    avatar,
    name,
    birth,
    services,
    gender,
    created_at
  })
}

exports.create = (request, response) => {
  return response.render('members/create')
}

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

exports.delete = (request, response) => {
  const { id } = request.body
  
  const filteredMembers = data.members.filter((member) => {
    return member.id !== id
  })

  data.members = filteredMembers
}
