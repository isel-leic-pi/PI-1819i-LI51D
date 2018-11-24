
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
function getAllTasks(req, res, next) {
    console.log(next)
    setTimeout(() => {
        let last_task = req.cookies['last-task'] || "none"
        res.send(`Get all tasks. Last acessed task was ${last_task}`)
        
    }, 2000)
}

function getTask(req, res) {
  let tid = req.params.tid;
    res.cookie("last-task", tid, {path: '/task'})
    res.send(`Get a single task with id ${tid} with query value ${req.query.a}. Full uri: ${req.url} `)
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