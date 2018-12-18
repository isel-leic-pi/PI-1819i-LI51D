require ('../node_modules/bootstrap/dist/css/bootstrap.min.css')
const templates = require('./templates')

;
(function () {  
  let mainContent = document.querySelector('#mainContent')
  window.addEventListener('hashchange', showView);
  showView();

  function showView() {  
    let [view, ...params] = window.location.hash.split('/')
    view = view.substring(1)

    let viewTemplate = templates[view]
    if(viewTemplate) {
      mainContent.innerHTML = viewTemplate.view.apply(null, params)
      viewTemplate.script()
    } else {
      window.location.hash = '#welcome'
    }
  }
})()
