class Pet {
  constructor(id, typeOfPet, nameOfPet, ageOfPet, ownerId) {
    this.id = id;
    this.typeOfPet = typeOfPet;
    this.nameOfPet = nameOfPet;
    this.ageOfPet = ageOfPet;
    this.ownerId = ownerId;
  }
}

class Tiger extends Pet {
  constructor(id, typeOfPet, nameOfPet, ageOfPet, ownerId, speed) {
    super(id, typeOfPet, nameOfPet, ageOfPet, ownerId);
    this.speed = speed;
  }
}

class Dog extends Pet {
  constructor(id, typeOfPet, nameOfPet, ageOfPet, ownerId, eyeColor) {
    super(id, typeOfPet, nameOfPet, ageOfPet, ownerId);
    this.eyeColor = eyeColor;
  }
}

class Cat extends Pet {
  constructor(id, typeOfPet, nameOfPet, ageOfPet, ownerId, numberOfLives) {
    super(id, typeOfPet, nameOfPet, ageOfPet, ownerId);
    this.numberOfLives = numberOfLives;
  }
}

class Fish extends Pet {
  constructor(id, typeOfPet, nameOfPet, ageOfPet, ownerId, color) {
    super(id, typeOfPet, nameOfPet, ageOfPet, ownerId);
    this.color = color;
  }
}

class GuineeaPig extends Pet {
  constructor(id, typeOfPet, nameOfPet, ageOfPet, ownerId, weight) {
    super(id, typeOfPet, nameOfPet, ageOfPet, ownerId);
    this.weight = weight;
  }
}
let pets = [];
const p1 = new Tiger(1, "Tiger", "Louis", 12, 5, "100 km/h");
const p2 = new Dog(2, "Dog", "Hulk", 2, 4, "Blue");
const p3 = new Cat(3, "Cat", "Lea", 2, 3, "9");
const p4 = new Fish(4, "Fish", "Nemo", 1, 2, "Red");
const p5 = new GuineeaPig(5, "Guineea-pig", "Piggie", 5, 1, "6");
const p6 = new Dog(6, "Dog", "Mars", 3, 3, "Brown");

pets.push(p1, p2, p3, p4, p5, p6);
console.log(pets);

if (localStorage.getItem("pets") === null) {
  localStorage.setItem("pets", JSON.stringify(pets));
}
