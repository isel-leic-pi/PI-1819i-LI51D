
module.exports = function(tasks_db) {
  return {
    getAllTasks: getAllTasks
  }

  async function getAllTasks(req, res, next) {
    return tasks_db.getAllTasks()
  }
}


