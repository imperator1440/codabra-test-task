const inputs = document.querySelectorAll('.input[type=text], .input[type=mail], .input[type=password]');

inputs.forEach(inputs => inputs.value = "");

inputs.forEach(input => input.addEventListener("focus", function() {
  input.nextElementSibling.classList.add("label_focused");
}));

inputs.forEach(input => input.addEventListener("blur", function() {
  if(!input.value) input.nextElementSibling.classList.remove("label_focused");
}));

