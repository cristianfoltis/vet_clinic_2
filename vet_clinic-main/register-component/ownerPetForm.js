$(document).on("click", "#submit", function () {
 
  var email = $("#email").val();
  var name = $("#ownerName").val();
  var phoneNumber = $("#phoneNumber").val();
  var typeOfPet = $("#typeOfPet").val();
  var nameOfPet = $("#nameOfPet").val();
  var ageOfPet = $("#ageOfPet").val();

  var data = localStorage.getItem("owners");
  var listOfOwners = JSON.parse(data);
  var currentOwner = listOfOwners.find((owner) => owner.email === email);
  var ownerId = 0;

  if (!currentOwner) {
    var maxId = listOfOwners.reduce((accumulator, currentValue) => {
      return accumulator.id > currentValue.id
        ? accumulator.id
        : currentValue.id;
    }, 0);

    ownerId = maxId + 1;

    console.log(maxId);

    var newOwner = new PetOwner(name, phoneNumber, email, maxId + 1);
    listOfOwners.push(newOwner);
  } else {
    ownerId = currentOwner.id;
  }

  localStorage.setItem("owners", JSON.stringify(listOfOwners));

  var datapet = localStorage.getItem("pets");
  var listOfPets = JSON.parse(datapet);

  var maxPetId = listOfPets.reduce((accumulator, currentValue) => {
    return accumulator.id > currentValue.id ? accumulator.id : currentValue.id;
  }, 0);

  console.log(maxPetId);

  var newPet = new Pet(maxPetId + 1, typeOfPet, nameOfPet, ageOfPet, ownerId);
  listOfPets.push(newPet);

  localStorage.setItem("pets", JSON.stringify(listOfPets));

  $("form")[0].reset();
  return false;
});
