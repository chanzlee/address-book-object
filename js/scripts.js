function Contact(id, firstName, lastName) {
  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.addresses = [];
}

Contact.prototype.name = function() {
  return this.firstName+ " "+this.lastName;
}

function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
}

Address.prototype.fullAddress = function() {
  return this.street + " " + this.city + " " + this.state;
}

$(document).ready(function(){
  var addressForm = $("#new-addresses").first().html();
  var contacts = [];
  var id = 0;

  $("#addForm").click(function(event){
    event.preventDefault();
    $("#new-addresses").append(addressForm);
  });
  $("#new-contact").submit(function(event){
    event.preventDefault();
    var contact = new Contact(id++, $("#firstName").val(), $("#lastName").val());
    $(".new-address").each(function(){
      contact.addresses.push(new Address($(".street").val(), $(".city").val(), $(".state").val()));
    });
    contacts.push(contact);
    $("#contactsDisplay").append("<li>"+contact.name()+"<span class='hidden id'>"+contact.id+"</span>"+"</li>")
    $("#contactsDisplay").children().last().click(function(){
      var id = parseInt($(this).find(".id").text());
      var contact = contacts.find(function(contact) {
        return contact.id === id;
      });
      $(".firstNameDisplay").text(contact.firstName);
      $(".lastNameDisplay").text(contact.lastName);
      contact.addresses.forEach(function(address){
        $("#addressesDisplay").append("<li>"+address.fullAddress()+"</li>");
      });

    });
  });
});
