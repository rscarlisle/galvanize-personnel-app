const baseURL = `https://galvanize-student-apis.herokuapp.com/gpersonnel`

document.addEventListener('DOMContentLoaded', () => {
  renderPic()
})

const renderPic = () => {
  axios.get(`${baseURL}/roles`)
    .then(result => {
      result.data.forEach(role => {
        let roleOption = document.createElement('option')
        roleOption.setAttribute('value', role.img)
        roleOption.textContent = role.title
        document.querySelector('.role').appendChild(roleOption)
      })
      document.querySelector('.role').onchange=renderSelectedPic
    })
}

const renderSelectedPic = (event) => {
  let roleImg = document.querySelector('.role-preview')
  document.querySelectorAll('option').forEach(role => {
    if (role.selected) {
      // display image
      roleImg.src = role.value
      roleImg.textContent = role.textContent
    }
  })
}

document.querySelector('.save').addEventListener('click', (event) => {
  event.preventDefault()
  let firstName = document.querySelector("input[name='first-name']")
  let lastName = document.querySelector("input[name='last-name']")
  let role = document.querySelector('.role-preview')

  axios.post(`${baseURL}/users`, {
    firstName: firstName.value,
    lastName: lastName.value,
    role: role.textContent
  })
    .then(result => {
      let saveStatus = document.querySelector('.save-status')
      // display message on success response
      saveStatus.textContent = result.data.message
      saveStatus.style.display = 'block'
      saveStatus.style.backgroundColor = 'hsl(110, 70%, 80%)'
    })
    .catch(error => {
      let saveStatus = document.querySelector('.save-status')
      // display message on error response
      saveStatus.textContent = error.response.data.message
      saveStatus.style.display = 'block'
      saveStatus.style.backgroundColor = 'hsl(0, 70%, 80%)'
    })
})