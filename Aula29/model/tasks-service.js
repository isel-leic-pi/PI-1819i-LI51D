
module.exports = function(tasks_db) {
  return {
    getAllTasks: getAllTasks
  }

  async function getAllTasks() {
    return tasks_db.getAllTasks()
  }
}


