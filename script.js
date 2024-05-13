//Валидация данных в inputs

const inputName = document.getElementById("inputName");
const inputVacancy = document.getElementById("inputVacancy");
const inputPhone = document.getElementById("inputPhone");

function checkInputName(name) {
  if (name.match(/^[a-zA-Z]+$/)) {
    return true;
  } else {
    return false;
  }
}

function checkInputVacancy(vacancy) {
  if (vacancy.length > 3) {
    return true;
  } else {
    return false;
  }
}

function checkInputPhone(phone) {
  if (phone.match(/^[0-9+]*$/)) {
    return true;
  } else {
    return false;
  }
}

//Класс по созданию контакта

class Contact {
  constructor(name, vacancy, phone, id) {
    (this.name = name),
      (this.vacancy = vacancy),
      (this.phone = phone),
      (this.id = id);
  }
}

//Функция для генерации id

function generateId() {
  return Math.floor(Math.random() * 100);
}

//При нажатии на кнопку 'add'

const buttonAdd = document.getElementById("buttonAdd");

function addContact(e, nameValue, vacancyValue, phoneValue) {
  e.preventDefault();
  if (
    checkInputName(nameValue) &&
    checkInputVacancy(vacancyValue) &&
    checkInputPhone(phoneValue)
  ) {
    return new Contact(nameValue, vacancyValue, phoneValue, generateId());
  } else if (!checkInputName(nameValue)) {
    inputName.classList.add("redBorder");
    inputName.value = "";
    inputName.placeholder = "Invalied Value";
    setTimeout(() => {
      inputName.placeholder = "Name";
      inputName.classList.remove("redBorder");
    }, 2000);
  } else if (!checkInputVacancy(vacancyValue)) {
    inputVacancy.classList.add("redBorder");
    inputVacancy.value = "";
    inputVacancy.placeholder = "Invalied Value";
    setTimeout(() => {
      inputVacancy.placeholder = "Vacancy";
      inputVacancy.classList.remove("redBorder");
    }, 2000);
  } else if (!checkInputPhone(phoneValue)) {
    inputPhone.classList.add("redBorder");
    inputPhone.value = "";
    inputPhone.placeholder = "Invalied Value";
    setTimeout(() => {
      inputPhone.placeholder = "Phone +X XXX XXX XX XX";
      inputPhone.classList.remove("redBorder");
    }, 2000);
  }
}

buttonAdd.addEventListener("click", function (e) {
  const contact = addContact(
    e,
    inputName.value,
    inputVacancy.value,
    inputPhone.value
  );
});
