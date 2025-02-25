// Function to handle form submission
async function submitBug(event) {
    event.preventDefault();

    let title = document.getElementById("bugTitle").value;
    let description = document.getElementById("bugDescription").value;

    if (title.trim() === "" || description.trim() === "") {
        alert("Please fill out all fields.");
        return;
    }

    let bug = { title, description };

    try {
        await fetch("http://localhost:8080/bugs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bug)
        });

        alert("Bug Submitted Successfully! ✅");
        document.getElementById("bugForm").reset();
        loadBugs();
    } catch (error) {
        alert("Failed to submit bug.");
    }
}

// Function to load bugs
async function loadBugs() {
    try {
        let response = await fetch("http://localhost:8080/bugs");
        let bugs = await response.json();

        let bugList = document.getElementById("bugList");
        bugList.innerHTML = "";

        bugs.forEach(bug => {
            let bugItem = document.createElement("div");
            bugItem.innerHTML = `
                <div class="bug-card ${bug.status === "closed" ? 'closed' : ''}">
                    <h3>${bug.title}</h3>
                    <p>${bug.description}</p>
                    <small>${new Date(bug.date).toLocaleString()}</small>
                    <p>Status: <strong>${bug.status}</strong></p>
                    <button onclick="deleteBug('${bug._id}')">🗑 Delete</button>
                    <button onclick="editBug('${bug._id}', '${bug.title}', '${bug.description}')">✏️ Edit</button>
                    <button onclick="toggleBugStatus('${bug._id}')">
                        ${bug.status === "open" ? "✔ Mark as Closed" : "⏳ Reopen"}
                    </button>
                </div>
            `;
            bugList.appendChild(bugItem);
        });
    } catch (error) {
        console.error("Error fetching bugs:", error);
    }
}

// Function to delete a bug
async function deleteBug(id) {
    try {
        await fetch(`http://localhost:8080/bugs/${id}`, { method: "DELETE" });
        alert("Bug deleted successfully!");
        loadBugs();
    } catch (error) {
        console.error("Error deleting bug:", error);
    }
}

// Function to edit a bug
async function editBug(id, title, description) {
    let newTitle = prompt("Enter new title:", title);
    let newDescription = prompt("Enter new description:", description);

    if (!newTitle || !newDescription) return alert("Update canceled!");

    try {
        await fetch(`http://localhost:8080/bugs/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTitle, description: newDescription })
        });

        alert("Bug updated successfully!");
        loadBugs();
    } catch (error) {
        console.error("Error updating bug:", error);
    }
}

// Function to toggle bug status
async function toggleBugStatus(id) {
    try {
        await fetch(`http://localhost:8080/bugs/${id}/status`, { method: "PATCH" });
        alert("Bug status updated!");
        loadBugs();
    } catch (error) {
        console.error("Error updating bug status:", error);
    }
}

// Load bugs on page load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("bugForm").addEventListener("submit", submitBug);
    loadBugs();
});
