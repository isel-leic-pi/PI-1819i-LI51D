
module.exports = function (routers, service) {
  let { global, specific } = routers

  // List all tasks
  specific.get('/', getAllTasks)
  // Search tasks
  specific.get('/search', searchTasks)
  // Shows the details of a task with the specified id
  specific.get('/:tid', getTask)
  // Create a new task
  specific.post('/', createTask)
  // Update the task with the specified id
  specific.put('/:tid', updateTask)
  // Update the task with the specified id
  specific.delete('/:tid', deleteTask)

  specific.use(errorHandling)

  return routers


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
