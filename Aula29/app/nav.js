
const navLinks = document.querySelectorAll('nav a.nav-link')
setCurrentActiveView()

window.addEventListener('hashchange', setCurrentActiveView)

function setCurrentActiveView() {
  navLinks.forEach(a => a.classList.remove('active'))
  let view = window.location.hash.split('/')[0]
  let selectedNavLink = document.querySelector(`nav a.nav-link[href='${view}']`)
  if(selectedNavLink) {
    selectedNavLink.classList.add('active')
  }
}



