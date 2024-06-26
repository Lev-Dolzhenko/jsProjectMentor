//Валидация данных в inputs

let buttonsDeleteCurrContact;
let buttonsEditCurrContact;
let globalDeleteAllContactsSet;
let buttonsDeleteAllContactsSet;
let buttonsDeleteAllContactsArr;
let firstFlag = false;
let secondFlag = false;

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

const arrayId = [];

function generateId() {
  const id = Math.floor(Math.random() * 100);
  if (arrayId.includes(id)) {
    generateId();
  }
  return id;
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
  inputName.value = "";
  inputPhone.value = "";
  inputVacancy.value = "";
});

//рендер контактов

const renderList = document.querySelector(".main__contacts--certain");

function renderContacts(letter) {
  while (renderList.firstChild) {
    renderList.removeChild(renderList.firstChild);
  }
  for (let contactData in contactsData) {
    if (letter === "") {
      const letterArray = contactsData[contactData];
      for (let letterArrayItem of letterArray) {
        let renderItem = `
        <div data-contact-id="${letterArrayItem.id}" class="main__contact--certain">
          <div class="main__contact--certain-name">
            <span>Name: </span>
            <strong data-contact-name=${letterArrayItem.name}>${letterArrayItem.name}</strong>
          </div>
          <div class="main__contact--certain-vacancy">
            <span>Vacancy: </span>
            <strong>${letterArrayItem.vacancy}</strong>
          </div>
          <div class="main__contact--certain-phone">
            <span>Phone: </span>
            <strong>${letterArrayItem.phone}</strong>
          </div>
            <button data-button-id="${letterArrayItem.id}"  class='main__contact--certain-button--delete'><img src='./images/deleteIcon.svg'></button>
            <button data-button-id-edit='${letterArrayItem.id}' class='main__contact--certain-button--edit'><img src='./images/editIcon.svg'></button>
      </div>
      `;
        const newElement = document.createElement("div");
        newElement.innerHTML = renderItem;
        renderList.appendChild(newElement);
      }
    } else {
      if (letter === contactData) {
        const letterArray = contactsData[contactData];
        for (let letterArrayItem of letterArray) {
          let renderItem = `
        <div data-contact-id="${letterArrayItem.id}" class="main__contact--certain">
          <div class="main__contact--certain-name">
            <span>Name: </span>
            <strong data-contact-name=${letterArrayItem.name}>${letterArrayItem.name}</strong>
          </div>
          <div class="main__contact--certain-vacancy">
            <span>Vacancy: </span>
            <strong>${letterArrayItem.vacancy}</strong>
          </div>
          <div class="main__contact--certain-phone">
            <span>Phone: </span>
            <strong>${letterArrayItem.phone}</strong>
          </div>
            <button data-button-id="${letterArrayItem.id}"  class='main__contact--certain-button--delete'><img src='./images/deleteIcon.svg'></button>
            <button data-button-id-edit='${letterArrayItem.id}' class='main__contact--certain-button--edit'><img src='./images/editIcon.svg'></button>
        </div>
      `;
          const newElement = document.createElement("div");
          newElement.innerHTML = renderItem;
          renderList.appendChild(newElement);
        }
      }
    }
  }
}

//При нажатии на опеделенную букву

let letterButtons = document.querySelectorAll(".contacts__element");

for (let letterButton of letterButtons) {
  letterButton.addEventListener("click", function () {
    renderContacts(letterButton.dataset.letter);

    buttonsDeleteCurrContact = document.querySelectorAll(
      ".main__contact--certain-button--delete"
    );

    buttonsEditCurrContact = document.querySelectorAll(
      ".main__contact--certain-button--edit"
    );

    for (let buttonEditCurrContact of buttonsEditCurrContact) {
      buttonEditCurrContact.addEventListener("click", function () {
        popupEdit.classList.remove("none");

        buttonChange.addEventListener("click", function () {
          editCurrContact(
            buttonEditCurrContact.dataset.buttonIdEdit,
            inputNameEdit.value,
            inputVacancyEdit.value,
            inputPhoneEdit.value,
            letterButton.dataset.letter
          );
          popupEdit.classList.add("none");
          renderContacts();
        });
      });
    }

    for (let buttonDeleteCurrContact of buttonsDeleteCurrContact) {
      buttonDeleteCurrContact.addEventListener("click", function () {
        firstFlag = false;
        secondFlag = true;
        defineCurrContact(
          buttonDeleteCurrContact,
          letterButton.dataset.letter,
          firstFlag,
          secondFlag
        );
        renderContacts();
        updateContactCounter(letterButton.dataset.letter);
      });
    }

    globalDeleteAllContactsSet = [...buttonsDeleteCurrContact];
    buttonsDeleteAllContactsSet = new Set(globalDeleteAllContactsSet);
    buttonsDeleteAllContactsArr = [...buttonsDeleteAllContactsSet];
  });
}

//Загрузка в localStorage

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

function updateLS() {
  localStorage.setItem("contactsData", JSON.stringify(this));
}

//Загрузка из localStorage

let contactsData;

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
    renderContacts("");
    showAllContacts();
  }
  updateLS.call(contactsData);
}

buttonDeleteAllContacts.addEventListener("click", function () {
  deleteAllContacts();
});

//Удаление определенного контакта

// let buttonsDeleteCurrContact;
// let buttonsEditCurrContact;
// let globalDeleteAllContactsSet;
// let buttonsDeleteAllContactsSet;
// let buttonsDeleteAllContactsArr;
// let firstFlag = false;
// let secondFlag = false;

function deleteCurrContact(id, letter, isAll, isCurrList) {
  // console.log(isAll, isCurrList);
  for (let i = 0; i < contactsData[letter].length; i++) {
    let contact = contactsData[letter][i];
    if (contact.id == id) {
      contactsData[letter].splice(i, 1);
      updateLS.call(contactsData);
      loadLS();
      if (isAll && !isCurrList) showAllContacts();
      else if (!isAll && isCurrList) renderContacts(letter);
      else {
        showAllContacts();
        renderContacts(letter);
      }
    }
  }
  // console.log(contactsData[letter]);
}

function defineCurrContact(currButton, currLetter, isAll, isCurrList) {
  const currContactIdData = currButton.dataset.buttonId;

  deleteCurrContact(currContactIdData, currLetter, isAll, isCurrList);
}

//Вывод всех контактов

const buttonShowAll = document.querySelector(".main__contacts--search-button");
const listAllContacts = document.querySelector(".main__contacts--search-list");

function showAllContacts() {
  while (listAllContacts.firstChild) {
    listAllContacts.removeChild(listAllContacts.firstChild);
  }
  for (let contactData in contactsData) {
    const letterArray = contactsData[contactData];
    for (let letterArrayItem of letterArray) {
      let renderItem = `
      <div data-contact-id="${letterArrayItem.id}" class="main__contact--certain">
          <div class="main__contact--certain-name">
            <span>Name: </span>
            <strong data-contact-name=${letterArrayItem.name}>${letterArrayItem.name}</strong>
          </div>
          <div class="main__contact--certain-vacancy">
            <span>Vacancy: </span>
            <strong>${letterArrayItem.vacancy}</strong>
          </div>
          <div class="main__contact--certain-phone">
            <span>Phone: </span>
            <strong>${letterArrayItem.phone}</strong>
          </div>
           <button data-button-id="${letterArrayItem.id}" class='main__contact--certain-button--delete'><img src='./images/deleteIcon.svg'></button>
           <button data-button-id-edit='${letterArrayItem.id}' class='main__contact--certain-button--edit'><img src='./images/editIcon.svg'></button>

      </div>
      `;
      const newElement = document.createElement("div");
      newElement.innerHTML = renderItem;
      listAllContacts.appendChild(newElement);
    }
  }

  buttonsDeleteCurrContact = document.querySelectorAll(
    ".main__contact--certain-button--delete"
  );

  buttonsEditCurrContact = document.querySelectorAll(
    ".main__contact--certain-button--edit"
  );

  for (let buttonEditCurrContact of buttonsEditCurrContact) {
    buttonEditCurrContact.addEventListener("click", function () {
      popupEdit.classList.remove("none");
    });
  }

  for (let letterButton of letterButtons) {
    globalDeleteAllContactsSet = [...buttonsDeleteCurrContact];
    buttonsDeleteAllContactsSet = new Set(globalDeleteAllContactsSet);
    buttonsDeleteAllContactsArr = [...buttonsDeleteAllContactsSet];

    for (let buttonDeleteCurrContact of buttonsDeleteCurrContact) {
      buttonDeleteCurrContact.addEventListener("click", function () {
        firstFlag = true;
        secondFlag = false;
        defineCurrContact(
          buttonDeleteCurrContact,
          letterButton.dataset.letter,
          firstFlag,
          secondFlag
        );
        updateContactCounter(letterButton.dataset.letter);
      });
    }
  }
}

buttonShowAll.addEventListener("click", function () {
  showAllContacts();
});

//Поиск контактов

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  listAllContacts.innerHTML = "";

  const filteredData = contactsData[
    searchTerm.slice(0, 1).toUpperCase()
  ].filter((item) => item.name.toLowerCase().includes(searchTerm));

  filteredData.forEach((item) => {
    let renderItem = `
  <div data-contact-id="${item.id}" class="main__contact--certain">
      <div class="main__contact--certain-name">
        <span>Name: </span>
        <strong data-contact-name=${item.name}>${item.name}</strong>
      </div>
      <div class="main__contact--certain-vacancy">
        <span>Vacancy: </span>
        <strong>${item.vacancy}</strong>
      </div>
      <div class="main__contact--certain-phone">
        <span>Phone: </span>
        <strong>${item.phone}</strong>
      </div>
        <button data-button-id="${item.id}" class='main__contact--certain-button--delete'><img src='./images/deleteIcon.svg'></button>
        <button data-button-id-edit='${item.id}' class='main__contact--certain-button--edit'><img src='./images/editIcon.svg'></button>
  </div>
  `;
    const newElement = document.createElement("div");
    newElement.innerHTML = renderItem;
    listAllContacts.appendChild(newElement);
  });
});

//Появление и скрытие модального окна изменения данных контакта

const popupEdit = document.querySelector(".popup--edit");
const buttonClosePopup = document.querySelector(".popup__button--close");

function closePopup() {
  popupEdit.classList.add("none");
}

buttonClosePopup.addEventListener("click", function () {
  closePopup();
});

//Изменение данных определенного контакта

const inputNameEdit = document.getElementById("inputNameEdit");
const inputVacancyEdit = document.getElementById("inputVacancyEdit");
const inputPhoneEdit = document.getElementById("inputPhoneEdit");

const buttonChange = document.querySelector(".popup__button-change");

function editCurrContact(id, nameVal, vacancyVal, phoneVal, currLatter) {
  console.log(currLatter);
  if (nameVal.slice(0, 1).toUpperCase() === currLatter) {
    let currArray = contactsData[currLatter];
    for (let currArrayItem of currArray) {
      if (id == currArrayItem.id) {
      }
    }
  }
}

// function editCurrContact(id, nameVal, vacancyVal, phoneVal) {
//   for (let contactData in contactsData) {
//     const letterArray = contactsData[contactData];
//     for (let letterArrayItem of letterArray) {
//       if (
//         id == letterArrayItem.id &&
//         nameVal.slice(0, 1).toLowerCase() ==
//           letterArrayItem.name.slice(0, 1).toLowerCase()
//       ) {
//         letterArrayItem.name = nameVal;
//         letterArrayItem.vacancy = vacancyVal;
//         letterArrayItem.phone = phoneVal;

//         renderContacts();

//         updateLS.call(contactsData);
//       } else if (
//         id == letterArrayItem.id &&
//         nameVal.slice(0, 1).toLowerCase() !=
//           letterArrayItem.name.slice(0, 1).toLowerCase()
//       ) {
//         let newLetter = nameVal.slice(0, 1).toUpperCase();

//         letterArrayItem.name = nameVal;
//         letterArrayItem.vacancy = vacancyVal;
//         letterArrayItem.phone = phoneVal;

//         contactData[newLetter].push(letterArrayItem);

//         updateLS.call(contactsData);
//         updateContactCounter(newLetter);
//         renderContacts();
//       }
//     }
//     renderContacts();

//     updateContactCounter(contactData);
//   }

//   inputNameEdit.value = "";
//   inputVacancyEdit.value = "";
//   inputPhoneEdit.value = "";
//   popupEdit.classList.add("none");
//   renderContacts();
// }

// function editCurrContact(id, nameVal, vacancyVal, phoneVal) {
//   loadLS();
//   for (let contactData in contactsData) {
//     const letterArray = contactsData[contactData];
//     for (let letterArrayItem of letterArray) {
//       // console.log(letterArrayItem);
//       if (
//         id == letterArrayItem.id &&
//         nameVal.slice(0, 1).toLowerCase() ==
//           letterArrayItem.name.slice(0, 1).toLowerCase()
//       ) {
//         console.log(letterArrayItem);
//         letterArrayItem.name = nameVal;
//         letterArrayItem.vacancy = vacancyVal;
//         letterArrayItem.phone = phoneVal;

//         // renderContacts(nameVal.slice(0, 1).toUpperCase());

//         updateLS.call(contactsData);
//       }
//       //  else if (
//       //   id == letterArrayItem.id &&
//       //   nameVal.slice(0, 1).toLowerCase() !=
//       //     letterArrayItem.name.slice(0, 1).toLowerCase()
//       // ) {
//       //   let newLetter = nameVal.slice(0, 1).toUpperCase();

//       //   letterArrayItem.name = nameVal;
//       //   letterArrayItem.vacancy = vacancyVal;
//       //   letterArrayItem.phone = phoneVal;

//       //   contactsData[newLetter].push(letterArrayItem);
//       //   console.log("gi");
//       //   letterArray.splice(letterArray.indexOf(letterArrayItem), 1);

//       //   updateLS.call(contactsData);
//       //   updateContactCounter(newLetter);
//       //   renderContacts("");
//       // }
//     }
//     // renderContacts("");

//     updateContactCounter(contactData);
//   }

//   inputNameEdit.value = "";
//   inputVacancyEdit.value = "";
//   inputPhoneEdit.value = "";
//   popupEdit.classList.add("none");
//   renderContacts();
// }
