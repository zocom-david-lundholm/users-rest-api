const BASE_URL = 'http://localhost:5000'

async function listUsers(){
    const response = await fetch(BASE_URL + '/users')
    const data = await response.json()
    return data
}

async function getUser(id){
    const response = await fetch(BASE_URL + '/users/' + id)
    const data = await response.json()
    return data
}

function formatUserName(name){
    return `${name.title} ${name.first} ${name.last}`
}

function renderUsers(list){
    const element = document.querySelector(".user-list")
    for(let user of list){
        let li = document.createElement("li")
        li.innerText = formatUserName(user.name)
        li.addEventListener("click", async () => {
            const userData = await getUser(user._id)
            renderUser(userData)
        })
        element.append(li)
    }
}

function renderUser(user){
    console.log(user);
    
    const element = document.querySelector(".user-info")
    element.querySelector(".name").innerText = formatUserName(user.name)
    element.querySelector(".email").innerText = user.email
    element.querySelector(".nationality").innerText = user.nat
}


async function run(){
    const users = await listUsers()
    renderUsers(users)
}
run()