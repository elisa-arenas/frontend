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

document.submitForm = function(event) {
    event.preventDefault()
    console.log(1)
    const message_form = document.querySelector(`#create-user-form`)
    const data = new FormData ()

    data.append("id", 0)
    let department = {
        "id": 0,
        "name": ""
    }
    for (let attribute of message_form) {
        if (attribute.id == "createUser") continue //Ignore create button

        if (attribute.id == "department"){
            department["name"] = attribute.value
        }
        else {
            data.append(attribute.id, attribute.value)
        }
    }
    console.log("Message form", message_form)
    const message = Object.fromEntries (data.entries ())
    console.log(message)
    message["fullName"] = message["firstName"] + " " + message["lastName"]
    message["department"] = department
    console.log ("Sending", message)
    console.log(JSON.stringify (message))

    fetch (`http://localhost:8080/api/employees`, {
        method: `POST`,
        body: JSON.stringify (message),
        headers: { 'Content-Type': 'application/json' }
    })
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

const departmentDropdown = document.querySelector(`#departments`)

console.log("Before department fetch")
const departments = await fetch(`http://localhost:8080/api/departments`).then((response) => response.json())
console.log("Post Department Fetch")
console.log(departments)
let numDepartments = departments.length
for (let i = 0; i < numDepartments; i++) {
    console.log(departments[i].name)
    let optionElement = document.createElement(`option`)
    optionElement.innerHTML = departments[i].name
    optionElement.setAttribute("value", departments[i].name)
    optionElement.setAttribute("name", departments[i].name)
    departmentDropdown.appendChild(optionElement)
}

console.log(departmentDropdown)
console.log(departments[0].name)