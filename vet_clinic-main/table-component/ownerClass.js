class PetOwner {
  constructor(name, phoneNumber, email, id) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.id = id;
  }
}
let persons = [];
let psn1 = new PetOwner(
  "Petre Anton",
  "+40756885501",
  "petre.anton@gmail.com",
  1
);
let psn2 = new PetOwner(
  "Dorin Albert",
  "+40756834567",
  "dorin.albert@gmail.com",
  2
);
let psn3 = new PetOwner(
  "Bianca Lucian",
  "+40724632501",
  "bianca.lucian@gmail.com",
  3
);
let psn4 = new PetOwner(
  "Mihai Luca",
  "+40756753235",
  "mihai.luca@gmail.com",
  4
);
let psn5 = new PetOwner(
  "Gavril Camelia",
  "+40756234123",
  "gavril.camelia@gmail.com",
  5
);

persons.push(psn1, psn2, psn3, psn4, psn5);

if (localStorage.getItem("owners") === null) {
  localStorage.setItem("owners", JSON.stringify(persons));
}
