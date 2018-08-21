function Contact(id, firstName, lastName) {
  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.addresses = [];
}

Contact.prototype.name = function() {
  return this.firstName+ " "+this.lastName;
}

function Address(type, street, city, state) {
  this.type = type;
  this.street = street;
  this.city = city;
  this.state = state;
}

Address.prototype.fullAddress = function() {
  return "Type: " + this.type + " <br>" + this.street + " " + this.city + " " + this.state;
}

$(document).ready(function(){
  // var addressForm = $("#new-addresses").first().html();
  var addressForm = '<div class="new-address"><h4>Address Type</h4><div class="radio"><label><input type="radio" name="addressType0" value="home" checked>Home</label></div><div class="radio"><label><input type="radio" name="addressType0" value="office">Office</label></div><div class="form-group"><label for="street">Street</label><input type="text" class="street form-control"></div><div class="form-group"><label for="city">City</label><input type="text" class="city form-control"></div><div class="form-group"><label for="state">State</label><input type="text" class="state form-control"></div></div>'

  var contacts = [];
  var id = 0;
  var addressCreateCount = 0;
  var initialForm = $("#new-contact").html();


  $("#addForm").click(function(event){
    event.preventDefault();
    addressCreateCount++;
    var addressFormNew = addressForm.replace(/name="addressType0"/g, 'name="addressType'+addressCreateCount+'"');
    $("#new-addresses").append(addressFormNew);
  });
  $("#new-contact").submit(function(event){
    event.preventDefault();
    var contact = new Contact(id++, $("#firstName").val(), $("#lastName").val());
    var addressReadCount=0;
    $(".new-address").each(function(){
      contact.addresses.push(new Address($("input:radio[name=addressType"+addressReadCount+"]:checked").val(), $(".street").val(), $(".city").val(), $(".state").val()));
      addressReadCount++;
    });
    contacts.push(contact);
    $("#contactsDisplay").append("<li>"+contact.name()+"<span class='hidden id'>"+contact.id+"</span>"+"</li>");
    $("#contactsDisplay").children().last().click(function(){
      var id = parseInt($(this).find(".id").text());
      var contact = contacts.find(function(contact) {
        return contact.id === id;
      });
      $(".firstNameDisplay").text(contact.firstName);
      $(".lastNameDisplay").text(contact.lastName);
      $("#addressesDisplay").text("");
      contact.addresses.forEach(function(address){
        $("#addressesDisplay").append("<li>"+address.fullAddress()+"</li>");
      });
    });
    addressCreateCount = 0;
    $("#new-contact").html(initialForm);
  });
});
