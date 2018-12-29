require ('../node_modules/bootstrap/dist/css/bootstrap.min.css')
const templates = require('./templates')
require('./nav.js')

; // This semicolon is required here. If ommited the JavaScrip interperter interprets this the following code as a function call, 
// and that is not what we want. This is one of a few singular situations where 
// semicolon is needed even if we have each instruction in its own line.

(function () {  
  let mainContent = document.querySelector('#mainContent')
  window.addEventListener('hashchange', showView);
  showView();

  async function showView() {  
    let [view, ...params] = window.location.hash.split('/')
    view = view.substring(1)

    let viewTemplate = templates[view]
    if(viewTemplate) {
      mainContent.innerHTML = await viewTemplate.view.apply(null, params)
      viewTemplate.script()
    } else {
      window.location.hash = '#welcome'
    }
  }
})()
