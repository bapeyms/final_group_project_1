document.addEventListener('DOMContentLoaded', function () {
  var searchBtn = document.querySelector('.btn-show-flights');

  var today = new Date().toISOString().split('T')[0];
  var dateInputs = document.querySelectorAll('input[type="date"]');

  var departInput = dateInputs[0];
  var returnInput = dateInputs[1];

  for (var i = 0; i < dateInputs.length; i++) {
    dateInputs[i].setAttribute('min', today);
  }

  departInput.onchange = function () {
    returnInput.setAttribute('min', departInput.value);

    if (returnInput.value < departInput.value) {
      returnInput.value = departInput.value;
    }
  };

  searchBtn.onclick = function (event) {
    event.preventDefault();

    var from = document.querySelector('input[placeholder="From"]').value;
    var to = document.querySelector('input[placeholder="To"]').value;
    var date = departInput.value;

    if (from == "") {
      alert("Вы не ввели, откуда летите!");
    }
    else if (to == "") {
      alert("Вы не ввели, куда летите!");
    }
    else if (date == "") {
      alert("Выберите дату вылета!");
    }
    else if (from == to) {
      alert("Город отправления и прибытия не могут быть одинаковыми!");
    }
    else {
      alert("Успешно! Ищем билеты из " + from + " в " + to);
    }
  };
});
var subForm = document.querySelector('.subscribe-form');

subForm.onsubmit = function (event) {
  var emailInput = subForm.querySelector('input').value;

  if (emailInput == "") {
    alert("Пожалуйста, введите вашу почту!");
    event.preventDefault();
  } else {
    alert("Спасибо за подписку! Письмо отправлено на: " + emailInput);
  }
};