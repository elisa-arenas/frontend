async function populateUsers() {
    const users_template = document.querySelector(`#result-template`)
    console.log(users_template)
    const user_results = document.querySelector(`#user-results`)
    
    const users = await fetch(`http://localhost:8080/api/employees`)
    .then((response) => response.json())
    console.log(users)
    
    for (let user of users) {
        const user_elems = users_template.content.cloneNode(true)
        const name = user_elems.querySelector(`h2`)
        name.innerHTML = user["fullName"]
        for (const key in user) {
            const slot = user_elems.querySelector(`slot[id="${key}"]`)
            if (slot) {
                slot.replaceWith(user[key])
            }
        }
    
        user_results.prepend(user_elems)
    
    }
}

async function getUser(id) {
    const users_template = document.querySelector(`#result-template`)
    console.log(users_template)
    const user_results = document.querySelector(`#user-results`)
    
    const user = await fetch(`http://localhost:8080/api/employees/${id}`)
    .then((response) => response.json())
    console.log(user)
    console.log(id)
        const user_elems = users_template.content.cloneNode(true)
        const name = user_elems.querySelector(`h2`)
        name.innerHTML = user["fullName"]
        for (const key in user) {
            const slot = user_elems.querySelector(`slot[id="${key}"]`)
            if (slot) {
                slot.replaceWith(user[key])
            }
        }
    
        user_results.prepend(user_elems)
    
}


const allUsersButton = document.querySelector(`#allUsers`)
console.log(allUsersButton)
allUsersButton.addEventListener("click", () => populateUsers())

const searchButton = document.querySelector(`#oneUser`)
const searchBar = document.querySelector(`#search-bar`)
console.log(searchBar.value)
searchButton.addEventListener("click", () => getUser(searchBar.value))


