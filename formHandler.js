const form = document.querySelector('.form');
const inputs = document.querySelectorAll('.input');
const userName = inputs[0];
const surname = inputs[1];
const birth = inputs[2];
const email = inputs[3];
const password = inputs[4];
const confirmPassword = inputs[5];
let isSubmitable = true;

inputs.forEach(inputs => inputs.value = "");

inputs.forEach(input => input.addEventListener("focus", () => {
  input.nextElementSibling.classList.add("label_focused");
}));

inputs.forEach(input => input.addEventListener("blur", () => {
  !input.value && input.nextElementSibling.classList.remove("label_focused");
}));

userName.addEventListener('input', (isSubmitable) => {
  if (!userName.checkValidity()) {
    userName.nextElementSibling.nextElementSibling.innerText = "Minimum 2 symbols.";
    isSubmitable = false;
  } else {
    userName.nextElementSibling.nextElementSibling.innerText = "";
    isSubmitable = true;
  }
});

surname.addEventListener('input', () => {
  if (!surname.checkValidity()) {
    surname.nextElementSibling.nextElementSibling.innerText = "Minimum 2 symbols.";
    isSubmitable = false;
  } else {
    surname.nextElementSibling.nextElementSibling.innerText = "";
    isSubmitable = true;
  }
});

birth.addEventListener('input', () => {
  if (!birth.checkValidity()) {
    birth.nextElementSibling.nextElementSibling.innerText = "Maximum date - today.";
    isSubmitable = false;
  } else {
    birth.nextElementSibling.nextElementSibling.innerText = "";
    isSubmitable = true;
  }
});

email.addEventListener('input', () => {
  if (!email.checkValidity()) {
    email.nextElementSibling.nextElementSibling.innerText = "Invalid email.";
    isSubmitable = false;
  } else {
    email.nextElementSibling.nextElementSibling.innerText = "";
    isSubmitable = true;
  }
});

password.addEventListener('input', () => {
  if (!password.checkValidity()) {
    password.nextElementSibling.nextElementSibling.classList.add("error__password");
    password.nextElementSibling.nextElementSibling.innerText = "Password must have at least 8 symbols, at least 1 capital letter, at least one digit (1-9), at least 1 special character (!@#$%)";
    isSubmitable = false;
  } else {
    password.nextElementSibling.nextElementSibling.innerText = "";
    password.nextElementSibling.nextElementSibling.classList.remove("error__password");
    isSubmitable = true;
  }
});

confirmPassword.addEventListener('input', () => {
  if (password.value !== confirmPassword.value) {
    confirmPassword.nextElementSibling.nextElementSibling.innerText = "Passwords must match.";
    isSubmitable = false;
  } else {
    confirmPassword.nextElementSibling.nextElementSibling.innerText = "";
    isSubmitable = true;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  inputs.forEach(input => {
    if(input.value == "") {
      input.nextElementSibling.nextElementSibling.innerText = "Must be filled.";
      isSubmitable = false;
    }
  });

  if (!isSubmitable) return;

  const formData = new FormData();
  formData.append('name', userName.value);
  formData.append('surname', surname.value);
  formData.append('birth', birth.value);
  formData.append('email', email.value);
  formData.append('password', password.value);

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .catch(error => console.error(error));  

  console.log("Body: ", formData);
});