
module.exports = function (router, service) {
  console.log("####")
  console.log(service)

  // List all tasks
  router.get('/', getAllTasks)
// Search tasks
  router.get('/search', searchTasks)
  // Shows the details of a task with the specified id
  router.get('/:tid', getTask)
  // Create a new task
  router.post('/', createTask)
  // Update the task with the specified id
  router.put('/:tid', updateTask)
  // Update the task with the specified id
  router.delete('/:tid', deleteTask)

  router.use(errorHandling)

  return router


  async function getAllTasks(req, res, next) {
    try {
      let tasks = await service.getAllTasks()
      res.json(tasks)
    } catch(e) {
      next(e)
    }
  }

  async function searchTasks(req, res, next) {
    try {
      let tasks = await service.getAllTasks()
      tasks = tasks.filter(matchesSearch)
      res.json(tasks)

      function matchesSearch(task) {
          const taskPropNames = Object.getOwnPropertyNames(task)
          console.log(task)
          return taskPropNames.every(name => {
              let res = !req.query[name] || (task[name].includes(req.query[name]))
              console.log(`${name} - ${res}`)
              return res;
            }
          )

      }

    } catch(e) {
      next(e)
    }
  }

  function getTask(req, res) {
    let tid = req.params.tid;
    res.cookie("last-task", tid, { path: '/task' })
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


  function errorHandling(err, req, rsp, next) {
    rsp.status(500).end("error")
  }
}
