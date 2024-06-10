const users_template = document.querySelector(`#result-template`)
console.log(users_template)
const user_results = document.querySelector(`#user-results`)

const users = await fetch(`http://localhost:8080/api/employees`)
.then((response) => response.json())
console.log(users)

for (let user of users) {
    const user_elems = users_template.content.cloneNode(true)
    const name = user_elems.querySelector(`h2`)
    name.replaceWith(`<h2>${user["fullName"]}</h2>`)
    for (const key in user) {
        const slot = user_elems.querySelector(`slot[id="${key}"]`)
        if (slot) {
            slot.replaceWith(user[key])
        }
    }

    user_results.prepend(user_elems)

}


