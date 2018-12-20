
module.exports = function (tasksResults) {

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
    results.innerHTML = tasksResults(tasks)

    // Register on the click event for each card result to show the task details
    document.querySelectorAll('#results .card').forEach(handleClick)
    function handleClick(card, idx) {
      card.onclick = function () {
          const hash = `#task/${tasks[idx].id}`
          console.log(hash)
          window.location.hash = `#task/${tasks[idx].id}`
      }
    }
  }

  function showSearchError(e) {
    console.log("####" + e)
    results.innerHTML = "Search not available. Try again later...";

  }
}

