// Function to handle form submission
function submitBug(event) {
    event.preventDefault(); // Prevent page reload

    let title = document.getElementById("bugTitle").value;
    let description = document.getElementById("bugDescription").value;

    if (title.trim() === "" || description.trim() === "") {
        alert("Please fill out all fields.");
        return;
    }

    // Create a bug object
    let bug = {
        title: title,
        description: description,
        date: new Date().toLocaleString()
    };

    // Add the bug to the list
    addBugToList(bug);

    // Show a success message
    alert("Bug Submitted Successfully! ✅");

    // Clear the form after submission
    document.getElementById("bugForm").reset();
}

// Function to add the bug to the list
function addBugToList(bug) {
    let bugList = document.getElementById("bugList");

    let bugItem = document.createElement("li");
    bugItem.innerHTML = `<strong>${bug.title}</strong> - ${bug.description} <br> <small>${bug.date}</small>`;

    bugList.appendChild(bugItem);

    console.log("Bug added:", bug);  // Debugging Log
}

// Attach event listener to form submission
document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("bugForm");
    
    if (form) {
        form.addEventListener("submit", submitBug);
    }
});
