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

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("authModal");
  const closeBtn = document.getElementById("closeModal");
  const tabs = document.querySelectorAll(".auth-tab");
  const forms = document.querySelectorAll(".auth-form");
  const dropbtn = document.querySelector(".dropbtn");
  const dropdownContent = document.querySelector(".dropdown-content");

  // DROPDOWN MENU LOGIC
  dropbtn.addEventListener("click", (e) => {
    dropdownContent.classList.toggle("show");
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    dropdownContent.classList.remove("show");
  });

  // MODAL WINDOW LOGIC
  document.querySelectorAll(".login-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      openModal("login");
      dropdownContent.classList.remove("show");
    });
  });

  document.querySelectorAll(".sign-up-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      openModal("signup");
      dropdownContent.classList.remove("show");
    });
  });

  function openModal(type) {
    modal.classList.add("active");
    switchTab(type);
  }

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  function switchTab(type) {
    tabs.forEach(tab => {
      tab.classList.toggle("active", tab.dataset.form === type);
    });
    forms.forEach(form => {
      form.classList.toggle("active", form.id === type);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      switchTab(tab.dataset.form);
    });
  });
});