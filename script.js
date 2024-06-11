async function populateUsers() {
    const users_template = document.querySelector(`#result-template`)
    console.log(users_template)
    const user_results = document.querySelector(`#user-results`)

    const children = Array.from(user_results.children);
    for (const user of children) {
        if(user !== users_template) {
            user_results.removeChild(user);
        }
    }

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

    const children = Array.from(user_results.children);
    for (const user of children) {
        if(user !== users_template) {
            user_results.removeChild(user);
        }
    }

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

function showForm(){
    const createUserForm = document.querySelector(`#create-user-dialog`);
    createUserForm.showModal();
}

function closeForm(){
    const createUserForm = document.querySelector(`#create-user-dialog`);
    createUserForm.close();
}

window.handle_form = function (){
    const message_form = document.querySelector (`#create-user-form`)
    const data = new FormData (message_form)
    const message = Object.fromEntries (data.entries ())
    console.log ("Sending", message)
}




const allUsersButton = document.querySelector(`#allUsers`)
console.log(allUsersButton)
allUsersButton.addEventListener("click", () => populateUsers())

const searchButton = document.querySelector(`#oneUser`)
const searchBar = document.querySelector(`#search-bar`)
console.log(searchBar.value)
searchButton.addEventListener("click", () => getUser(searchBar.value))


const createUserButton = document.querySelector(`#create-user-button`)
createUserButton.addEventListener("click", () => showForm())

const closeFormButton = document.querySelector(`#close-button`)
closeFormButton.addEventListener("click", () => closeForm())

const createUserForm = document.querySelector(`#createUser`)
createUserForm.addEventListener("click", () => window.handle_form())