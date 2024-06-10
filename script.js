const users_template = document.querySelector(`#result-template`)
console.log(users_template)
const user_results = document.querySelector(`#user-results`)

for (let i=0; i<3; i++) {
    const user_elems = users_template.content.cloneNode(true)
    const slot = user_elems.querySelector(`h2`)
    if(slot) {
        slot.replaceWith(`Username: ${i} ~`)
    }

    user_results.prepend(user_elems)

}


