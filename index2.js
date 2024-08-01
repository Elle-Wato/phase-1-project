function showAssignment(assignment){
    const assignmentCollection = document.getElementById("task-collection")
    const div = document.createElement("div")
    div.classList.add("card")
    const header = document.createElement("h3")
    header.textContent = "Homework Assignment"
    const subject = document.createElement("li")
    subject.textContent = `Subject: ${assignment.classSubject}`
    const titles = document.createElement("li")
    titles.textContent = `Title: ${assignment.title}`
    const date = document.createElement("li")
    date.textContent = `Date due: ${assignment.dueDate}`
    const instruction = document.createElement("li")
    instruction.textContent = `Instructions: ${assignment.instructions}`
    const button = document.createElement("button")
    button.classList.add("delete-btn")
    button.textContent = "Delete Assignment"
    button.id = assignment.id
    button.addEventListener('click', () => {
      fetch(`http://localhost:3000/classAssignments/${assignment.id}`, {
        method: 'DELETE'
      })
      .then(() => div.remove())
    })
    div.append(header, subject, titles, date, instruction, button)
    assignmentCollection.append(div)
}
// Define the URL of the JSON file
const jsonUrl = './db.json';

// Fetch the JSON data
fetch(jsonUrl)
.then(response => {
// Check if the response is OK
if (!response.ok) {
throw new Error('Network response was not ok');
}
// Parse the JSON data
return response.json();
})
.then(data => {
// Handle the JSON data
console.log(data);

const myData = data.classAssignments.map(item => {
  return `<div style="background:#eee;padding:3px;">
  <p> subject: ${item.classSubject}</p>
  <p> title: ${item.title}</p>
  <p> dueDate: ${item.dueDate}</p>
  <button>Completed Assignment</button>
  </div> `
  
 
})
// Display the data in the HTML
const dataContainer = document.getElementById('data-container');
dataContainer.innerHTML = myData
// dataContainer.innerHTML = JSON.stringify(
//   data, null, 2); // Pretty-print JSON data
// })
// .catch(error => {
// // Handle any errors
// console.error('There was a problem with the fetch operation:', error);
}).catch(error => {console.error('There was a problem with the fetch operation:', error)})


// function getAssignments(){
//     fetch("http://localhost:3000/classAssignments")
//     .then(response => response.json())
//     .then(data => data.forEach(assignment => showAssignment(assignment)))
//   }


  
  const form = document.querySelector(".add-hw-tasks")
form.addEventListener('submit', addAssignment)

function addAssignment(event){
  event.preventDefault()
  const [classSubject, title, dueDate, instructions] = event.target
  fetch("http://localhost:3000/classAssignments", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          classSubject: classSubject.value,
          title: title.value,
          dueDate: dueDate.value,
          instructions: instructions.value
        })
      })
      .then(response => response.json())
      .then(response => showAssignment(response))
      form.reset()
}

const buttonChange = document.querySelector(".submit")

function mouseEnter(){
  buttonChange.style.background = 'yellow'
}

function mouseLeave(){
  buttonChange.style.background = ''
}

buttonChange.addEventListener("mouseenter", mouseEnter)
buttonChange.addEventListener("mouseleave", mouseLeave)

//This variable holds the decision of default of "NO"

let decision = 'NO'

//Create button and give its inner text of decision

   const priorityButton = document.createElement('button')
   priorityButton.innerText = `Priority: ${decision}`

   /*Create an event listener for the button and pass an anonymous function that changes the decision when the button is clicked.*/

priorityButton.addEventListener('click', () => {
    if(decision === 'NO'){
      decision = 'YES'
    }else{
      decision = 'NO'
    }
   priorityButton.innerText = `Priority: ${decision}`
   })
