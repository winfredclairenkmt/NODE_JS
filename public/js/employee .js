const form = document.getElementById('employeeForm');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  if (validateForm()) {
    // Submit the form 
    form.submit();
  }
});

function validateForm() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  const telephone = document.getElementById("telephone").value;

  // Perform your validation logic here
  //Checking if any field is empty
  if (firstName === "" || lastName === "" || email === "" || age === "" || telephone === "") {
    alert("Please fill in all fields");
    return false;
  }

  // regular expression for email
let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.value.match(emailRegex)) {
      email.style.border = "1px solid red";
      emailError.textContent = "Invalid Email address";
      email.focus();
    alert("Please enter a valid email address");
    return false;
  }

  //checking if telephone is valid

  return true;
}