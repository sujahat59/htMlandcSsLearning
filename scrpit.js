// Function to handle "Report a Bug" button click
function reportBug() {
    alert("Bug reported successfully!");
}

// Function to handle form submission
function submitBug(event) {
    event.preventDefault(); // Prevent page reload

    let title = document.getElementById("bugTitle").value;
    let description = document.getElementById("bugDescription").value;

    if (title && description) {
        alert(`Bug Submitted!\nTitle: ${title}\nDescription: ${description}`);
        document.getElementById("bugForm").reset(); // Clear form
    } else {
        alert("Please fill in all fields.");
    }
}

// Attach event listeners after DOM loads
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("reportBtn").addEventListener("click", reportBug);
    document.getElementById("bugForm").addEventListener("submit", submitBug);
});
