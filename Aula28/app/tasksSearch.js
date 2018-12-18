const Handlebars = require('../node_modules/handlebars/dist/handlebars')
const tasksSearchResultsTemplate = require('./searchResults.hbs')
const tasksResultsTemplateCompiled = Handlebars.compile(tasksSearchResultsTemplate)



window.onload = function (event) {

  document.body.addEventListener("click", bodyClickCapturing, true)
  document.body.addEventListener("click", bodyClickBubling, false)

  const search = document.getElementById("search")
  const id = document.getElementById("id")
  const type = document.getElementById("type")
  const description = document.getElementById("description")
  const results = document.getElementById("results")

  search.addEventListener("click", event => { console.log("prevent defaut"); event.preventDefault() }, true)
  search.onclick = searchClick;

  function searchClick(event) {
    console.log("searchClick")
    ajaxSeach()
  }

  function ajaxSeach() {
    const url = `http://localhost:3000/api/tasks/search?id=${id.value}&type=${type.value}&description=${description.value}`
    fetch(url)
      .then(processResponse)
      .then(showTaskResultsView)
      .catch(showSearchError)
  }

  function processResponse(rsp) {
    if (!rsp.ok) {
      throw "error"
    }
    console.log("$$$$$")
    return rsp.json()
  }

  function showTaskResultsView(tasks) {
    results.innerHTML = tasksResultsTemplateCompiled(tasks)
  }

  function showSearchError(e) {
    console.log("####" + e)
    results.innerHTML = "Search not available. Try again later...";

  }
}


function bodyClickCapturing(event) {
  console.log("bodyClickCapturing")
  //event.stopPropagation()
}

function bodyClickBubling(event) {
  console.log("bodyClickBubling")
}


