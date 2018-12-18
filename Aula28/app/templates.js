const Handlebars = require('../node_modules/handlebars/dist/handlebars')

const nop = function () { }
const tasksSearchScript = require('./tasksSearch')
const noView = function () { 
  return 'no view'
}

const compiledTemplates = {
  welcome: Handlebars.compile(require('./templates/welcome.hbs')),
  tasksSearch: Handlebars.compile(require('./templates/tasksSearch.hbs')), 
  tasksSearchResults: Handlebars.compile(require('./templates/searchResults.hbs'))
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
    view: function() { 
      console.log(`task called with ${arguments[0]}`)
    },
    script: nop
  }
}
