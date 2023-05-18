module.exports = {
  age: function(timestamp) {
    const today = new Date()
    const birthDate = new Date(timestamp)
  
    let age = today.getFullYear() - birthDate.getFullYear()
    const moth = today.getMonth() - birthDate.getMonth()
  
    if (moth < 0 || moth == 0 && today.getDate() <= birthDate.getDate()) {
      age--
    }
  
    return age
  },
  date: function(timestamp) {
    const date = new Date(timestamp)

    const year = date.getUTCFullYear()
    const moth = date.getUTCMonth() + 1
    const day = date.getUTCDate()

    return `${year}-${moth}-${day}`
  }
}
