const form = document.querySelector('.form');
const inputs = document.querySelectorAll('.input');
const userName = inputs[0];
const surname = inputs[1];
const birth = inputs[2];
const email = inputs[3];
const password = inputs[4];
const confirmPassword = inputs[5];

const passwordError = 'Password must have at least 8 symbols, at least 1 capital letter, at least one digit (1-9), at least 1 special character (!@#$%)';

const maxDate = new Date();
maxDate.setHours(23, 59, 59, 999);
birth.setAttribute('max', maxDate.toISOString().split("T")[0]); 

inputs.forEach(inputs => inputs.value = '');

inputs.forEach(input => input.addEventListener('focus', () => {
  input.nextElementSibling.classList.add('label_focused');
}));

inputs.forEach(input => input.addEventListener('blur', () => {
  !input.value && input.nextElementSibling.classList.remove('label_focused');
}));

const inputCheck = (input, message, classToToggle) => {
  input.addEventListener('input', () => {
    if (!input.checkValidity()) {
      input.nextElementSibling.nextElementSibling.innerText = message;
      if (classToToggle) {
        input.nextElementSibling.nextElementSibling.classList.add(classToToggle);
      }
    } else {
      input.nextElementSibling.nextElementSibling.innerText = '';
      if (classToToggle) {
        input.nextElementSibling.nextElementSibling.classList.remove(classToToggle);
      }
    }
  });
};

inputCheck(userName, 'Minimum 2 symbols.');
inputCheck(surname, 'Minimum 2 symbols.');
inputCheck(birth, 'Maximum date - today.');
inputCheck(email, 'Invalid email.');
inputCheck(password, passwordError, 'error__password')

confirmPassword.addEventListener('input', () => {
  if (password.value !== confirmPassword.value) {
    confirmPassword.nextElementSibling.nextElementSibling.innerText = 'Passwords must match.';
  } else {
    confirmPassword.nextElementSibling.nextElementSibling.innerText = '';
  }
});

const isSubmitableCheck = (inputs) => {
  return Array.from(inputs).every(input => {
    return !input.nextElementSibling.nextElementSibling.innerText;
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  inputs.forEach(input => {
    if (!input.value) {
      input.nextElementSibling.nextElementSibling.innerText = 'Must be filled.';
    }
  });

  if (!isSubmitableCheck(inputs)) {
    return;
  }

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
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Body: ', formData);
    })
    .catch(error => {
      console.error('Error: ', error);
    });  
});