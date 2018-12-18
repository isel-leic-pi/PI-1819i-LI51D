const Handlebars = require('../node_modules/handlebars/dist/handlebars')
const welcomeTemplate = require('./templates/welcome.hbs')
const tasksSearchTemplate = require('./templates/tasksSearch.hbs')
const tasksSearchResultsTemplate = require('./templates/searchResults.hbs')


const nop = function () { }
const tasksSearchScript = require('./tasksSearch')
const noView = function () { 
  return 'no view'
}


module.exports = {
  welcome: {
    view: Handlebars.compile(welcomeTemplate),
    script: nop
  },
  tasksSearch: {
    view: Handlebars.compile(tasksSearchTemplate),
    script: () => tasksSearchScript(Handlebars.compile(tasksSearchResultsTemplate))
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
