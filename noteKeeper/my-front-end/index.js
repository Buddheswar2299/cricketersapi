import axios from "axios"
import { render } from "react-dom"


// Initilasing the variables using const 
const deleteAllNodesBtn = document.querySelector('.delete-all-nodes')
const nodeTitle = document.querySelectorAll('.noteTitle')
const firstName = document.querySelector('#first_name-id')
const lastName = document.getElementById('last_name-id')
const emailPerson = document.getElementById('email-id')
const phoneNumber = document.getElementById('number-id')
const roleType = document.getElementById('role-id')
const availablilityOfPerson = document.getElementById('boolean-id')
console.log(document.querySelector('.create-node'))

let data = []


document.querySelector('.create-node').addEventListener('click',async(e)=>{
    e.preventDefault()
    console.log('button is clicked')
    let notes = {
            first_name: firstName.value,
            last_name : lastName.value,
            email: emailPerson.value,
            phone:phoneNumber.value,
            role:roleType.value,
            available: availablilityOfPerson.value
        }
    
        let addPlayers = await axios.post('http://localhost:3000/users/add-players',notes)
        console.log(addPlayers)
        
        makeInputsEmpty()
        removeElementsFromScreen()
        renderElementsToScreen()
})


    // document.querySelector('.update-node').addEventListener('click',async()=>{
    //     // let updateNotesToApi = await axios.put(`http://localhost:3000/users/update-players/${uniqueId}`,updateNotes)
    //     // console.log(updateNotesToApi)
    //     // console.log(updateNotes)
    // })



function removeElementsFromScreen(){
    document.querySelectorAll(".note").forEach(notes=>{
        notes.remove()
    })
}

async function renderElementsToScreen(){
    try{
    let players = await axios.get("http://localhost:3000/users/get-players")

    // console.log(players.data.playerData)
    data = players.data.playerData
    console.log(data)
    data.forEach(note=>{
        renderNodeToScreen(note,note._id)
       
    })
    }catch(error){
        console.error("error fetching the api",error)
    }
}


renderElementsToScreen()


function renderNodeToScreen(note, uniqueId){
    let mainDiv = document.createElement('div')
    mainDiv.classList.add('note','id-'+uniqueId)
    let fullName = document.createElement('h3')
    let email = document.createElement('p')
    let number = document.createElement('p')
    let role = document.createElement('p')
    let availability = document.createElement('p')
    let button1 = document.createElement('button')
    let button2 = document.createElement('button')
    button1.className = 'update-btn'
    button2.className = 'delete-btn'

    button1.innerHTML = "update"
    button2.innerHTML = 'delete'
    fullName.innerText = `Name: ${note.first_name} ${note.last_name}`
    email.innerText = `email: ${note.email}`
    number.innerText = `Phone: ${note.phone}`
    role.innerHTML = `role: ${note.role}`
    availability.innerText = `available: ${note.available? "yes" : "no"}`

    mainDiv.append(fullName,email,number,role,availability,button1,button2)

    document.querySelector('.header').append(mainDiv)

    button1.addEventListener('click',async()=>{
        console.log(uniqueId)

        const childElement = document.querySelector('.id-' + uniqueId);
        // const parentElement = childElement.parentElement;
        

        const splitFirstName = childElement.firstChild.innerHTML.split(" ")[1]
        const splitLastName = childElement.firstChild.innerHTML.split(" ")[2]
        const splitEmail =  childElement.firstChild.nextElementSibling.innerHTML.split(': ')[1]
        const splitPhone = childElement.firstChild.nextElementSibling.nextElementSibling.innerHTML.split(': ')[1]
        const splitRole = childElement.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML.split(': ')[1]
        const splitAvailable = childElement.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML.split(': ')[1]
        console.log(splitEmail)
        console.log(splitPhone)
        console.log(splitAvailable)


        firstName.value = splitFirstName
        lastName.value = splitLastName
        emailPerson.value = splitEmail
        phoneNumber.value = splitPhone
        roleType.value = splitRole
        availablilityOfPerson.value = splitAvailable

        
        updatePlayer(uniqueId)
    })

    button2.addEventListener('click',async()=>{
        console.log(uniqueId)
        let deletePlayer = await axios.delete(`http://localhost:3000/users/delete-players/${uniqueId}`)
        console.log(deletePlayer)
        removeElementsFromScreen()
        renderElementsToScreen()
    })


}



function updatePlayer(uniqueId){

    document.querySelector('.update-node').addEventListener('click',async()=>{

        let updateNotes = {
            first_name: firstName.value,
            last_name : lastName.value,
            email: emailPerson.value,
            phone:phoneNumber.value,
            role:roleType.value,
            available: availablilityOfPerson.value
        }

        let updateNotesToApi = await axios.put(`http://localhost:3000/users/update-players/${uniqueId}`,updateNotes)
            console.log(updateNotesToApi)

            makeInputsEmpty()
            removeElementsFromScreen()
            renderElementsToScreen()
    })
}

function makeInputsEmpty(){
    firstName.value = ''
    lastName.value = ''
    emailPerson.value = ''
    phoneNumber.value = ''
    roleType.value = ''
    availablilityOfPerson.value = ''
}

// renderNodeToScreen()


 