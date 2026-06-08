// Replace the URL placeholder below with your actual API Gateway POST Invoke URL
const API_URL = "https://baaqp2nro7.execute-api.ap-south-2.amazonaws.com/prod/apply";

document.getElementById("applicationForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Stop the page from refreshing on form submit

    const msgDiv = document.getElementById("message");
    msgDiv.className = "";
    msgDiv.innerText = "Submitting your application...";
    msgDiv.style.display = "block";

    // Gather input values from the HTML form fields
    const formData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        qualification: document.getElementById("qualification").value,
        experience: document.getElementById("experience").value,
        skills: document.getElementById("skills").value,
        coverLetter: document.getElementById("coverLetter").value
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            msgDiv.className = "success";
            msgDiv.innerText = "Application submitted successfully! ID: " + (result.applicationId || "Done");
            document.getElementById("applicationForm").reset(); // Clear the form fields
        } else {
            throw new Error(result.error || "Submission failed.");
        }
    } catch (error) {
        msgDiv.className = "error";
        msgDiv.innerText = "Error: " + error.message;
        console.error("Submission Error:", error);
    }
});
