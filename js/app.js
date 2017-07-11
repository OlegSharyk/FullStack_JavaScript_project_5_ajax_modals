/**
 * Created by debbieobrien on 10/07/2017.
 */
let personHTML;

let $modal = $('<div id="modal"></div>');
let $image = $('<img>');
let $name = $('<p>dfdd</p>');

$modal.append($image);
$modal.append($name);
$('#people').after($modal);

$("#people a").click(function(event){
    event.preventDefault();
    let imageLocation = $(this).children("img").attr('src');
    $image.attr("src", imageLocation);
    $modal.show();
});
$modal.click(function(){
    //Hide the modal
    $modal.hide();
});



function displayData(person){
    personHTML += '<a href="#"><div class="person">';
    personHTML += '<img src ="' + person.picture.large + '">';
    personHTML += '<div><span class="name">' + person.name.first;
    personHTML += ' ' + person.name.last + '</span>';
    personHTML += '<p class="email">' + person.email + '</p>';
    personHTML += '<p class="city">' + person.location.city + '</p></div>';

    personHTML += '</div></a>';
    $('#people').html(personHTML);
}
function displayDataComplete(person){
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

