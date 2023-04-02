const form = document.querySelector('.form');
const inputs = document.querySelectorAll('.input[type=text], .input[type=email], .input[type=password]');
const confirmPassword = inputs[4];

inputs.forEach(inputs => inputs.value = "");

inputs.forEach(input => input.addEventListener("focus", () => {
  input.nextElementSibling.classList.add("label_focused");
}));

inputs.forEach(input => input.addEventListener("blur", () => {
  !input.value && input.nextElementSibling.classList.remove("label_focused");
}));

confirmPassword.addEventListener("input", () => {
  const value = confirmPassword.value;
  if (value !== inputs[3].value) console.log('wrong');
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', form.elements.name.value);
  formData.append('surname', form.elements.surname.value);
  formData.append('birth', form.elements.birth.value);
  formData.append('email', form.elements.email.value);
  formData.append('password', form.elements.password.value);

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));  

  console.log("Body: ", formData);
});