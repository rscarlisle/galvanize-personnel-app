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