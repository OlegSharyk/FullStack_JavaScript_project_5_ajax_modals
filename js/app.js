/**
 * Created by debbieobrien on 10/07/2017.
 */
let personHTML;

let $overlay = $('<div id="overlay"></div>');
let $modal = $('<div id="modal"></div>');
let $image = $('<img>');
let $name = $('<p>dfdd</p>');
$overlay.hide();

$overlay.append($modal);
$modal.append($image);
$modal.append($name);
$('#people').after($overlay);

let people = document.getElementById('people');
people.addEventListener("click", function(e){
    //let name = e.target.getElementsByClassName('name').innerHTML();
    let image = e.target.src;
    $image.attr('src', image);
    $name.text(name);
    console.log(image);

    $overlay.show();
});

$overlay.click(function(){
    //Hide the modal
    $overlay.hide();
});



function displayData(person){
    personHTML += '<div class="person"><a href="#">';
    personHTML += '<img src ="' + person.picture.large + '">';
    personHTML += '<div><span class="name">' + person.name.first;
    personHTML += ' ' + person.name.last + '</span>';
    personHTML += '<p class="email">' + person.email + '</p>';
    personHTML += '<p class="city">' + person.location.city + '</p></div>';
    personHTML += '</a></div>';
    $('#people').html(personHTML);
}
function displayDataModal(person){
    personHTML += '<a href="#"><div class="person">';
    personHTML += '<p><span>Name: ' + person.name.first + ' </span>';
    personHTML += '<span>' + person.name.last + '</span></p>';
    personHTML += '<p> Email: ' + person.email + '</p>';
    personHTML += '<p> Location: ' + person.location.city + '</p>';
    personHTML += '<img src ="' + person.picture.large + '">';
    personHTML += '<p> Username: ' + person.login.username + '</p>';
    personHTML += '<p> CellNumber: ' + person.cell + '</p>';
    personHTML += '<p> BirthDate: ' + person.dob + '</p>';
    personHTML += '<p> address: ' + person.location.street + ', ' + person.location.city + ', ' + person.location.state + ', ' + person.location.postcode + '</p>';
    personHTML += '</div></a>';
    $('#people').html(personHTML);
}



$.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function(data) {
        $.each( data.results, function( i, person ) {
            displayData(person)
        });

    }

});

