document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#waitingListModal form");
    const submitBtn = document.querySelector("#waitingListModal .btn-primary");

    submitBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const grade = document.querySelector("#grade").value;

        if (!name || !email || grade === "Select grade level") {
            alert("Please fill in all fields!");
            return;
        }

        const formData = { name, email, grade };

        try {
            const response = await fetch("http://localhost:5000/join-waiting-list", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            alert(result.message);
        } catch (error) {
            alert("Something went wrong. Please try again.");
        }
    });
});
