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
// console.log(data);

const myData = data.classAssignments.map(item => {
  return `<div style="background:#eee;padding:3px;">
  <p> subject: ${item.classSubject}</p>
  <p> title: ${item.title}</p>
  <p> dueDate: ${item.dueDate}</p>
   <div class="button">
  <button id='${item.id}'>Complete Assignment</button>
  </div>

  </div> 
 `
  
})

// Function to fetch JSON data from the server
async function fetchData() {
  try {
      const response = await fetch('db.json'); // Path to your JSON file
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched data:', data.classAssignments); // Debug log

      // Access the classAssignment array from the data object
      if (!data.classAssignments || !Array.isArray(data.classAssignments)) {
          console.warn('classAssignment is missing or not an array');
          return [];
      }
      
      return data.classAssignments;
  } catch (error) {
      console.error('Failed to fetch data:', error);
      return []; // Return an empty array in case of error
  }
}


// Function to render items
function renderItems(items) {
  console.log('Items to render:', items); // Debug log
  if (!Array.isArray(items)) {
      console.error('Expected items to be an array but got:', typeof items);
      return;
  }
  const itemContainer = document.getElementById('data-container');
  itemContainer.innerHTML = ''; // Clear existing items
  items.forEach(item => {
      // Create a div for each item
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item';
      
      const itemS = document.createElement("p")

      itemS.textContent = `Subject: ${item.classSubject}`
      itemDiv.appendChild(itemS)

       const itemT = document.createElement("p")
       itemT.textContent = `Title: ${item.title}`
      itemDiv.appendChild(itemT)

       const itemD = document.createElement("p")
       itemD.textContent = `Due date: ${item.dueDate}`
      itemDiv.appendChild(itemD)

      // Create delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => deleteItem(item.id, items);
      itemDiv.appendChild(deleteButton);
      
      // Append item div to container
      itemContainer.appendChild(itemDiv);
  });
}

// Function to delete an item by ID
function deleteItem(id, items) {
  const updatedItems = items.filter(item => item.id !== id);
  renderItems(updatedItems);
  // Optionally, send the updatedItems to the server if needed
}

// Fetch and render items on page load
fetchData().then(items => renderItems(items));


// Display the data in the HTML
const dataContainer = document.getElementById('data-container');
dataContainer.innerHTML = myData

}).catch(error => {console.error('There was a problem with the fetch operation:', error)})

  
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
