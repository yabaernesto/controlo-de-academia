module.exports = {
  age: function(timestamp) {
    const today = new Date()
    const birthDate = new Date(timestamp)
  
    let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
    const moth = today.getUTCMonth() - birthDate.getUTCMonth()
  
    today.getUTCDate()
    birthDate.getUTCDate()
  
    if (moth < 0 || moth == 0 && today.getUTCDate() < birthDate.getUTCDate()) {
      age = age - 1
    }
  
    return age
  },
  date: function(timestamp) {
    const date = new Date(timestamp)

    const year = date.getUTCFullYear()
    const moth = date.getUTCMonth() + 1
    const day = date.getUTCDay()

    console.log(`${year} - ${moth} - ${day}`)
  }
}
