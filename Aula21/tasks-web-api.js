
module.exports = function(router) {
    // List all tasks
    router.get('/', getAllTasks)
    // Shows the details of a task with the specified id
    router.get('/:tid', getTask)
    // Create a new task
    router.post('/', createTask)
    // Update the task with the specified id
    router.put('/:tid', updateTask)
    // Update the task with the specified id
    router.delete('/:tid', deleteTask)

    return router

}
function getAllTasks(req, res) {
    setTimeout(() => {
        res.send('Get all tasks')
    }, 2000)
}

function getTask(req, res) {
    res.send(`Get a single task with id ${req.params.tid} with query value ${req.query.a}. Full uri: ${req.url} `)
  }

  function createTask(req, res) {
    res.send('Create a task.')
    console.log(`Request body content-type: ${req.get("Content-Type")}`)

    console.log(`Body content is:`)
    console.log(req.body)


  }

  function updateTask(req, res) {
    res.send('Update a task')
  }

  function deleteTask(req, res) {
    res.send('Delete a task')
  }