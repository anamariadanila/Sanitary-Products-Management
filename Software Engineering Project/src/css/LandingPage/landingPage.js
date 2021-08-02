const toggleButton = document.getElementsByClassName('headerContainer__hamburger')[0]
const navBarLinks = document.getElementsByClassName('headerContainer__right')[0]

toggleButton.addEventListener('click', () => {
    navBarLinks.classList.toggle('active')
})