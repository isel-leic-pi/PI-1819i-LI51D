
module.exports = function(auth_db) {
  return {
    authenticate: authenticate
  }

  async function authenticate(username, pass) {
    return {
      username
    }
  }
}


