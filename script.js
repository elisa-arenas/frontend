async function getUsers() {
  const users_template = document.querySelector(`#result-template`);
  console.log(users_template);
  const user_results = document.querySelector(`#user-results`);

  const children = Array.from(user_results.children);
  for (const user of children) {
    if (user !== users_template) {
      user_results.removeChild(user);
    }
  }

  const users = await fetch(`http://localhost:8080/api/employees`).then(
    (response) => response.json()
  );
  console.log(users);

  for (let user of users) {
    const user_elems = users_template.content.cloneNode(true);
    getUserFields(user_elems, user, user_results);
  }
}

async function getUser(id) {
  const users_template = document.querySelector(`#result-template`);
  console.log(users_template);
  const user_results = document.querySelector(`#user-results`);

  const children = Array.from(user_results.children);
  for (const user of children) {
    if (user !== users_template) {
      user_results.removeChild(user);
    }
  }

  const user = await fetch(`http://localhost:8080/api/employees/${id}`).then(
    (response) => response.json()
  );
  console.log(user);
  console.log(id);

  const user_elems = users_template.content.cloneNode(true);
  getUserFields(user_elems, user, user_results);
}

function getUserFields(user_elems, user, user_results) {
  const name = user_elems.querySelector(`#fullName`);
  name.innerHTML = user["fullName"];

  const email = user_elems.querySelector(`#userEmail`);
  email.innerHTML = `Email: ${user["email"]}`;

  const phone = user_elems.querySelector(`#userPhone`);
  phone.innerHTML = `Phone: ${user["phone"]}`;

  const title = user_elems.querySelector(`#userTitle`);
  title.innerHTML = `Title: ${user["title"]}`;

  const deleteButton = user_elems.querySelector("#deleteUser");
  deleteButton.addEventListener("click", async () => {
    await fetch(`http://localhost:8080/api/employees/${user["id"]}`, {
      method: `DELETE`,
      body: JSON.stringify(user["id"]),
      headers: { "Content-Type": "application/json" },
    });
    getUsers();
  });

  console.log(user);
  for (const key in user) {
    const slot = user_elems.querySelector(`slot[id="${key}"]`);
    if (slot) {
      slot.replaceWith(user[key]);
    }
  }

  user_results.prepend(user_elems);
}

function showCreateUserForm() {
  const createUserForm = document.querySelector(`#create-user-dialog`);
  createUserForm.showModal();
}

function closeCreateUserForm() {
  const createUserForm = document.querySelector(`#create-user-dialog`);
  createUserForm.close();
}

function submitCreateForm(event) {
  event.preventDefault();
  console.log(1);
  const message_form = document.querySelector(`#create-user-form`);
  const data = new FormData();

  data.append("id", 0);
  let department = {
    id: 0,
    name: "",
  };
  for (let attribute of message_form) {
    if (attribute.id == "createUser") continue; //Ignore create button

    if (attribute.id == "departments") {
      department["name"] = attribute.value;
    } else {
      data.append(attribute.id, attribute.value);
    }
  }
  console.log("Message form", message_form);
  const message = Object.fromEntries(data.entries());
  console.log(message);
  message["fullName"] = message["firstName"] + " " + message["lastName"];
  message["department"] = department;
  console.log("Sending", message);
  console.log(JSON.stringify(message));

  fetch(`http://localhost:8080/api/employees`, {
    method: `POST`,
    body: JSON.stringify(message),
    headers: { "Content-Type": "application/json" },
  });

  closeCreateUserForm();
}

function submitEditForm(event) {}

function showEditUserForm() {
  const editUserForm = document.querySelector(`#edit-user-dialog`);
  editUserForm.showModal();
}

function closeEditUserForm() {
  const editUserForm = document.querySelector(`#edit-user-dialog`);
  editUserForm.close();
}

const allUsersButton = document.querySelector(`#allUsers`);
console.log(allUsersButton);
allUsersButton.addEventListener("click", () => getUsers());

const searchButton = document.querySelector(`#oneUser`);
const searchBar = document.querySelector(`#search-bar`);
console.log(searchBar.value);
searchButton.addEventListener("click", () => getUser(searchBar.value));

const createUserButton = document.querySelector(`#create-user-button`);
createUserButton.addEventListener("click", () => showCreateUserForm());

const closeCreateFormButton = document.querySelector(`#close-button`);
closeCreateFormButton.addEventListener("click", () => closeCreateUserForm());

const editUserButton = document.querySelector(`#edit-user-button`);
editUserButton.addEventListener("click", () => showEditUserForm());

const closeEditFormButton = document.querySelector(`#close-edit-button`);
closeEditFormButton.addEventListener("click", () => closeEditUserForm());

const departmentDropdown = document.querySelector(`#departments`);

console.log("Before department fetch");
const departments = await fetch(`http://localhost:8080/api/departments`).then(
  (response) => response.json()
);
console.log("Post Department Fetch");
console.log(departments);
let numDepartments = departments.length;
for (let i = 0; i < numDepartments; i++) {
  console.log(departments[i].name);
  let optionElement = document.createElement(`option`);
  optionElement.innerHTML = departments[i].name;
  optionElement.setAttribute("value", departments[i].name);
  optionElement.setAttribute("name", departments[i].name);
  departmentDropdown.appendChild(optionElement);
}

console.log(departmentDropdown);
console.log(departments[0].name);
