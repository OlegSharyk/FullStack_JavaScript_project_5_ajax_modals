/**
 * Created by debbieobrien on 10/07/2017.
 */
let personHTML;
$.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function(data) {
        $.each( data.results, function( i, person ) {
            displayData(person)
        });
        let $person = $('.person');
        //console.log($person);
        $person.on("click", function(e){
            e.preventDefault();
           // displayDataModal(this);


            $overlay.show();
        });

    }

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
    $('#modal').html(personHTML);
}

let $overlay = $('<div id="overlay"></div>');
let $modal = $('<div id="modal"></div>');
let $image = $('<img>');
let $name = $('<p>dfdd</p>');
$overlay.hide();

$overlay.append($modal);
$modal.append($image);
$modal.append($name);
$('#people').after($overlay);

$overlay.click(function(){
    //Hide the modal
    $overlay.hide();
});




//let image = $('img');
//$image.attr('src', image);
//$name.text(name);
//console.log($(this).textContent);
//console.log($(this))




