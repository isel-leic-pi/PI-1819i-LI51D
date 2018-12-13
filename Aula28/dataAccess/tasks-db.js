
const fetch = require('node-fetch')

module.exports = function(esconfig) {
  return {
    getAllTasks: getAllTasks
  }

  function url(type, path = "") {
    type = type ? (type + '/') : ""
  
    return `http://${esconfig.host}:${esconfig.port}/${esconfig.index}/${type}${path}`
  }

  async function getAllTasks(req, res, next) {
    let requestUrl = url(null,"_search")
    console.log(`requesting url: ${requestUrl}`)


      return fetch(requestUrl)
        .then(res => res.json())
        .then(resObj => resObj.hits.hits.map(hit => hit._source))
  }  
}


