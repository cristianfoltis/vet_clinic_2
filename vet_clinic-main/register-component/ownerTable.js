function registerEventListeners() {
  const htmlTableEditButtons = document.querySelectorAll(
    '[data-edit="edit-button"]'
  );
  const editButtonsArray = Array.from(htmlTableEditButtons);
  editButtonsArray.forEach((button) => {
    button.addEventListener("click", editButtonClickHandler);
  });

  const deleteButtons = document.querySelectorAll(
    '[data-delete="delete-button"]'
  );
  const buttonsArray = Array.from(deleteButtons);
  buttonsArray.forEach((button) => {
    button.addEventListener("click", deleteButtonClickHandler);
  });
}

function getOwnersFromLocalStorage() {
  $("#owner-table tbody").empty();
  var data = localStorage.getItem("owners");
  var listOfOwners = JSON.parse(data);

  listOfOwners.forEach((element) => {
    var row =
      '<tr data-owner-id="' +
      element.id +
      '">' +
      "<td>" +
      element.id +
      "</td>" +
      "<td>" +
      element.name +
      "</td>" +
      "<td>" +
      element.phoneNumber +
      "</td>" +
      "<td>" +
      element.email +
      "</td>" +
      '<td>  <button data-edit="edit-button"> Edit </button> </td>' +
      '<td>  <button data-delete="delete-button"> Delete </button> </td> </tr>';
    $("#owner-table tbody").append(row);
  });
  registerEventListeners();
}

getOwnersFromLocalStorage();

function deleteButtonClickHandler(event) {
  const dataOwnerId =
    event.target.parentNode.parentNode.getAttribute("data-owner-id");

  let existingOwners = localStorage.getItem("owners");
  var listOfOwners = JSON.parse(existingOwners);
  listOfOwners = listOfOwners.filter((o) => o.id != dataOwnerId);
  localStorage.setItem("owners", JSON.stringify(listOfOwners));

  let existingPets = localStorage.getItem("pets");
  var listOfPets = JSON.parse(existingPets);
  listOfPets = listOfPets.filter((pet) => pet.ownerId != dataOwnerId);
  localStorage.setItem("pets", JSON.stringify(listOfPets));

  getOwnersFromLocalStorage();
}

function editButtonClickHandler(event) {
  const dataOwnerId =
    event.target.parentNode.parentNode.getAttribute("data-owner-id");
  let owners = localStorage.getItem("owners");
  var listOfOwners = JSON.parse(owners);

  let owner = listOfOwners.find((o) => o.id == dataOwnerId);
  openOwnerModal(owner);
}

function openOwnerModal(owner) {
  $("#myModal").modal("show");

  $("#email").val(owner.email);
  $("#ownerName").val(owner.name);
  $("#phoneNumber").val(owner.phoneNumber);

  $(document).ready(function () {
    $("#saveButton").click(function () {
      var dataOwner = localStorage.getItem("owners");
      var listOfOwners = JSON.parse(dataOwner);

      var index = listOfOwners.findIndex((obj) => obj.id == owner.id);
      if (index != -1) {
        listOfOwners[index].email = $("#email").val();
        listOfOwners[index].name = $("#ownerName").val();
        listOfOwners[index].phoneNumber = $("#phoneNumber").val();
      } else {
        owner.email = $("#email").val();
        owner.name = $("#ownerName").val();
        owner.phoneNumber = $("#phoneNumber").val();
        listOfOwners.push(owner);
      }

      localStorage.setItem("owners", JSON.stringify(listOfOwners));

      $("#myModal").modal("hide");

      getOwnersFromLocalStorage();
    });
  });
}

$(document).ready(function () {
  $("#add-owner").click(function () {
    var dataOwner = localStorage.getItem("owners");
    var listOfOwners = JSON.parse(dataOwner);

    var maxId = listOfOwners.reduce((accumulator, currentValue) => {
      return accumulator.id > currentValue.id
        ? accumulator.id
        : currentValue.id;
    }, 0);

    var owner = {
      id: maxId + 1,
      name: "",
      phoneNumber: "",
      email: "",
    };

    openOwnerModal(owner);
  });
});
