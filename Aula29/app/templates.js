const Handlebars = require('../node_modules/handlebars/dist/handlebars')

const nop = function () { }
const tasksSearchScript = require('./tasksSearch')

const noView = function () { 
  return 'no view'
}

const compiledTemplates = {
  welcome: syncToAsync(Handlebars.compile(require('./templates/welcome.hbs'))),
  tasksSearch: syncToAsync(Handlebars.compile(require('./templates/tasksSearch.hbs'))), 
  tasksSearchResults: syncToAsync(Handlebars.compile(require('./templates/searchResults.hbs')))
}

async function syncToAsync(syncF) {
  return syncF()
}

module.exports = {
  welcome: {
    view: compiledTemplates.welcome,
    script: nop
  },
  tasksSearch: {
    view: compiledTemplates.tasksSearch,
    script: () => tasksSearchScript(compiledTemplates.tasksSearchResults)
  },
  tasksBundles: {
    view: noView,
    script: nop
  },
  task: {
    view: async function() { 
      return `no view for task ${arguments[0]} details `
      console.log(`task called with ${arguments[0]}`)
    },
    script: nop
  }
}
