const firstnames = [
  "Anna",
  "Boris",
  "Cecilia",
  "David",
  "Egon",
  "Ferdinand",
  "Gisela",
  "Clarissa",
];

const lastnames = [
  "Ackermann",
  "Bauer",
  "Cilius",
  "Duck",
  "Engelmann",
  "Feuerstein",
  "Gans",
  "Thomas",
];

document.addEventListener("DOMContentLoaded", loadNamesFromLocalStorage);

let persons = [];

function loadNamesFromLocalStorage() {
  persons = JSON.parse(localStorage.getItem("persons")) || [];
  persons.forEach(createPersonCard);
}

function randomFirstName() {
  return firstnames[Math.floor(Math.random() * 8)];
}

function randomLastName() {
  return lastnames[Math.floor(Math.random() * 8)];
}

function randomAge() {
  return Math.floor(Math.random() * (50 - 1) + 1);
}

function createRandomPerson() {
  const person = {
    id: Math.random(),
    firstName: randomFirstName(),
    lastName: randomLastName(),
    age: randomAge(),
  };

  persons.push(person);
  createPersonCard(person);
  saveToLocalStorage(persons);
}

function saveToLocalStorage(persons) {
  localStorage.setItem("persons", JSON.stringify(persons));
}

function readFromLocalStorage() {
  const personsFromStorage = JSON.parse(localStorage.getItem("persons"));
  if (personsFromStorage !== null) {
    persons = personsFromStorage;
  }
}

function deleteFromLocalStorage(personId) {
  persons = persons.filter((person) => person.id !== personId);
  saveToLocalStorage(persons);
}

function createPersonCard(person) {
  const card = document.createElement("div");
  card.classList.add("person-card");

  const firstName = document.createElement("p");
  firstName.innerHTML = person.firstName;

  const lastName = document.createElement("p");
  lastName.innerHTML = person.lastName;

  const age = document.createElement("p");
  age.innerHTML = person.age;

  const deletePerson = document.createElement("button");
  deletePerson.classList.add("delete");
  deletePerson.innerHTML = "X";
  deletePerson.addEventListener("click", () => {
    deleteFromLocalStorage(person.id);
    card.remove();
  });

  card.appendChild(firstName);
  card.appendChild(lastName);
  card.appendChild(age);
  card.append(deletePerson);

  const wrapper = document.getElementById("wrapper");
  wrapper.appendChild(card);
}

function createRandomColor() {
  const colors = ["#ff2e9a", "#5d00ff", "#cfff04", "#1c1c1c"];
  const cards = document.querySelectorAll(".person-card");

  cards.forEach((card) => {
    const textColor = colors[Math.floor(Math.random() * colors.length)];
    const backgrounds = colors.filter((c) => c !== textColor);
    const bgColor = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    card.style.color = textColor;
    card.style.background = bgColor;
  });
}
