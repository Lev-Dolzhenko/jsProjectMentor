//Валидация данных в inputs

// import image from "./images/deleteIcon.svg";

const inputName = document.getElementById("inputName");
const inputVacancy = document.getElementById("inputVacancy");
const inputPhone = document.getElementById("inputPhone");

function checkInputName(name) {
  if (
    !name.match(/^[a-zA-Z]+$/) ||
    name.length === 0 ||
    name.slice(0, 1) !== name.slice(0, 1).toUpperCase()
  ) {
    return false;
  } else {
    return true;
  }
}

function checkInputVacancy(vacancy) {
  if (vacancy.length < 3) {
    return false;
  } else {
    return true;
  }
}

function checkInputPhone(phone) {
  if (!phone.match(/^[0-9+]*$/)) {
    return false;
  } else {
    return true;
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

//Добавление контакта в общий список

const buttonAdd = document.getElementById("buttonAdd");

function creatContact(e, nameValue, vacancyValue, phoneValue) {
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

function isDuplicate(contact) {
  const resStr = `${contact.name}${contact.vacancy}${contact.phone}`;
  for (let contactData in contactsData) {
    const letterArray = contactsData[contactData];
    for (let letterArrayItem of letterArray) {
      let currStr = `${letterArrayItem.name}${letterArrayItem.vacancy}${letterArrayItem.phone}`;
      if (resStr === currStr) {
        return true;
      }
    }
  }
  return false;
}

function addContact(contact) {
  const currLetter = contact.name.slice(0, 1);
  const currArray = contactsData[currLetter];
  if (isDuplicate(contact)) {
    alert("Такой пользователь уже существует!");
  }

  currArray.push(contact);
  // console.log(currArray);
  // console.log(contactsData);
}

buttonAdd.addEventListener("click", function (e) {
  const contact = creatContact(
    e,
    inputName.value,
    inputVacancy.value,
    inputPhone.value
  );
  addContact(contact);
  updateContactCounter(inputName.value.slice(0, 1));
  updateLS.call(contactsData);
  loadLS();
});

//рендер контактов

const renderList = document.querySelector(".main__contacts--certain");

function renderContacts(letter) {
  while (renderList.firstChild) {
    renderList.removeChild(renderList.firstChild);
  }
  for (let contactData in contactsData) {
    if (letter === contactData) {
      const letterArray = contactsData[contactData];
      for (let letterArrayItem of letterArray) {
        let renderItem = `
        <div class="main__contact--certain">
          <div class="main__contact--certain-name">
            <span>Name: </span>
            <strong>${letterArrayItem.name}</strong>
          </div>
          <div class="main__contact--certain-vacancy">
            <span>Vacancy: </span>
            <strong>${letterArrayItem.vacancy}</strong>
          </div>
          <div class="main__contact--certain-phone">
            <span>Phone: </span>
            <strong>${letterArrayItem.phone}</strong>
          </div>
          <button class='main__contact--certain-button--delete'><img src='./images/deleteIcon.svg'></button>
      </div>
      `;
        const newElement = document.createElement("div");
        newElement.innerHTML = renderItem;
        renderList.appendChild(newElement);
      }
    }
  }
}

//При нажатии на опеделенную букву

const letterButtons = document.querySelectorAll(".contacts__element");

for (let letterButton of letterButtons) {
  letterButton.addEventListener("click", function () {
    renderContacts(letterButton.dataset.letter);
  });
}

//Обновление счетчика контактов у определнной буквы

const counterLetters = document.querySelectorAll(".contacts__element--counter");

function updateContactCounter(letter) {
  for (let counterLetter of counterLetters) {
    const dataCounterLetter = counterLetter.dataset.letterCounter;
    if (letter === dataCounterLetter) {
      const currLengthLetterArray = contactsData[letter].length;
      counterLetter.textContent = `${
        currLengthLetterArray === 0 ? "" : currLengthLetterArray
      }`;
    }
  }
}

//Загрузка в localStorage

function updateLS() {
  localStorage.setItem("contactsData", JSON.stringify(this));
}

//Загрузка из localStorage

function loadLS() {
  contactsData = JSON.parse(localStorage.getItem("contactsData"));

  if (contactsData === null) {
    contactsData = {
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      H: [],
      I: [],
      J: [],
      K: [],
      L: [],
      M: [],
      N: [],
      O: [],
      P: [],
      Q: [],
      R: [],
      S: [],
      T: [],
      U: [],
      V: [],
      W: [],
      X: [],
      Y: [],
      Z: [],
    };
  }

  for (let contactData in contactsData) {
    if (contactsData[contactData].length > 0) {
      updateContactCounter(contactData);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadLS();
});

//Удаление всех контактов

const buttonDeleteAllContacts = document.getElementById("deletAllContacts");

function deleteAllContacts() {
  for (let contactData in contactsData) {
    contactsData[contactData].length = 0;
    updateContactCounter(contactData);
  }
  updateLS.call(contactsData);
}

buttonDeleteAllContacts.addEventListener("click", function () {
  deleteAllContacts();
});

//Удаление определенного контакта

const buttonsDeleteCurrContact = document.querySelectorAll(
  ".main__contact--certain-button--delete"
);

function deleteCurrContact() {
  
}

for (let buttonsDeleteCurrContact of buttonssDeleteCurrContact) {
  buttonsDeleteCurrContact.addEventListener("click", function () {
    deleteCurrContact();
  });
}
