function registerEventListeners() {
  const deleteButtons = document.querySelectorAll(
    '[data-delete="delete-button"]'
  );
  const buttonsArray = Array.from(deleteButtons);
  buttonsArray.forEach((button) => {
    button.addEventListener("click", deleteButtonClickHandler);
  });

  const linkToOwner = document.querySelectorAll('[data-link="to-owner"]');
  const linkToOwnerArray = Array.from(linkToOwner);
  linkToOwnerArray.forEach((button) => {
    button.addEventListener("click", linkButtonClickHandler);
  });

  const htmlTableEditButtons = document.querySelectorAll(
    '[data-edit="edit-button"]'
  );
  const editButtonsArray = Array.from(htmlTableEditButtons);
  editButtonsArray.forEach((button) => {
    button.addEventListener("click", editButtonClickHandler);
  });
}

function getPetsFromLocalStorage() {
  $("#pets-table tbody").empty();

  var datapet = localStorage.getItem("pets");
  var listOfPets = JSON.parse(datapet);

  let owners = JSON.parse(localStorage.getItem("owners"));

  listOfPets.forEach((element) => {
    let owner = owners.find((owner) => owner.id === element.ownerId);

    var row =
      '<tr data-pet-id="' +
      element.id +
      '"' +
      'data-owner-id="' +
      element.ownerId +
      '" > ' +
      "<td>" +
      element.typeOfPet +
      "</td>" +
      "<td>" +
      element.nameOfPet +
      "</td>" +
      "<td>" +
      element.ageOfPet +
      "</td>" +
      '<td>  <button data-delete="delete-button"> Delete </button> </td>' +
      '<td>  <button data-link="to-owner">' +
      owner.name +
      "</button> </td>" +
      '<td>  <button data-edit="edit-button"> Edit </button> </td> </tr>';
    $("#pets-table tbody").append(row);
  });
  registerEventListeners();
}

getPetsFromLocalStorage();

function deleteButtonClickHandler(event) {
  const dataPetId =
    event.target.parentNode.parentNode.getAttribute("data-pet-id");

  let existingPets = localStorage.getItem("pets");
  var listOfPets = JSON.parse(existingPets);
  listOfPets = listOfPets.filter((pet) => pet.id != dataPetId);
  localStorage.setItem("pets", JSON.stringify(listOfPets));

  getPetsFromLocalStorage();
}

function linkButtonClickHandler(event) {
  const dataOwnerId =
    event.target.parentNode.parentNode.getAttribute("data-owner-id");
  let owners = localStorage.getItem("owners");
  var listOfOwners = JSON.parse(owners);

  let owner = listOfOwners.find((own) => own.id == dataOwnerId);
  showOwnerDetails(owner);
}

function showOwnerDetails(owner) {
  console.log(owner);
  $("#owner-details").empty();

  var div =
    '<div id="owner-detail-list" class="owner-container"> <h3> Owner Details </h3>' +
    '<ul class="list"> <li> Owner Id ' +
    owner.id +
    "</li>" +
    "<li> Owner Name " +
    owner.name +
    "</li>" +
    "<li> Owner Phone Number " +
    owner.phoneNumber +
    "</li> </ul> </div>";

  $("#owner-details").append(div);
}

function editButtonClickHandler(event) {
  const dataPetId =
    event.target.parentNode.parentNode.getAttribute("data-pet-id");
  let pets = localStorage.getItem("pets");
  var listOfPets = JSON.parse(pets);

  let pet = listOfPets.find((pet) => pet.id == dataPetId);
  openPetModal(pet);
}

function openPetModal(pet) {
  $(document).ready(function () {
    $("#petModal").modal("show");

    var dataOwner = localStorage.getItem("owners");
    var listOfOwners = JSON.parse(dataOwner);

    selectRender(listOfOwners);

    $("#typeOfPet").val(pet.typeOfPet);
    $("#nameOfPet").val(pet.nameOfPet);
    $("#ageOfPet").val(pet.ageOfPet);

    if (pet.ownerId) {
      var currentOwner = listOfOwners.find((o) => o.id == pet.ownerId);
      $("#owner-select").val(currentOwner.id).change();
    }
  });

  $(document).ready(function () {
    $("#saveButton").click(function () {
      var typeOfPet = $("#typeOfPet").val();
      var nameOfPet = $("#nameOfPet").val();
      var ageOfPet = $("#ageOfPet").val();

      var ownerId = $("#owner-select").val();

      var datapet = localStorage.getItem("pets");
      var listOfPets = JSON.parse(datapet);

      var index = listOfPets.findIndex((obj) => obj.id == pet.id);
      if (index != -1) {
        listOfPets[index].typeOfPet = typeOfPet;
        listOfPets[index].nameOfPet = nameOfPet;
        listOfPets[index].ageOfPet = ageOfPet;
        listOfPets[index].ownerId = parseInt(ownerId);
      } else {
        pet.nameOfPet = nameOfPet;
        pet.ageOfPet = ageOfPet;
        pet.typeOfPet = typeOfPet;
        pet.ownerId = parseInt(ownerId);
        listOfPets.push(pet);
      }

      localStorage.setItem("pets", JSON.stringify(listOfPets));

      $("#petModal").modal("hide");

      getPetsFromLocalStorage();
    });
  });
}

$(document).ready(function () {
  $("#add-pet").click(function () {
    var datapet = localStorage.getItem("pets");
    var listOfPets = JSON.parse(datapet);

    var maxId = listOfPets.reduce((accumulator, currentValue) => {
      return accumulator.id > currentValue.id
        ? accumulator.id
        : currentValue.id;
    }, 0);

    var pet = {
      id: maxId + 1,
      nameOfPet: "",
      ageOfPet: "",
      typeOfPet: "",
    };

    openPetModal(pet);
  });
});

function selectRender(listOfOwners) {
  var select = document.getElementById("owner-select");

  $("#owner-select").empty();

  for (var i = 0; i < listOfOwners.length; i++) {
    var own = listOfOwners[i];
    var el = document.createElement("option");
    el.textContent = own.name;
    el.value = own.id;
    select.appendChild(el);
  }
}
