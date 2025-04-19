// Get elements
const modal = document.getElementById("sessionModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.querySelector(".close-btn");
const form = document.getElementById("sessionForm");

// Handle form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const parentFirstName = form.firstName.value;
  const parentLastName = form.lastName.value;
  const parentEmail = form.email.value;
  const grade = form.grade.value;
  const childName = form.childName.value;

  if (!parentFirstName || !parentLastName || !parentEmail || !grade || !childName) {
    alert("All fields are required!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/submit-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parentFirstName,
        parentLastName,
        parentEmail,
        grade,
        childName,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Session request submitted successfully!");
      form.reset(); // Reset form
      modal.style.display = "none"; // Close modal
    } else {
      alert(result.message || "An error occurred. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while submitting the session request.");
  }
});

// Open modal
openModalBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

// Close modal
closeModalBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// Close if clicked outside modal content
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
