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
        $('#people').html(personHTML)
    }

});

function displayData(person){
    personHTML += '<div class="person">';
    personHTML += '<p><span>Name: ' + person.name.first + ' </span>';
    personHTML += '<span>' + person.name.last + '</span></p>';
    personHTML += '<p> Email: ' + person.email + '</p>';
    personHTML += '<p> Location: ' + person.location.city + '</p>';
    personHTML += '<img src ="' + person.picture.large + '"></img>';
    personHTML += '<p> Username: ' + person.login.username + '</p>';
    personHTML += '<p> CellNumber: ' + person.cell + '</p>';
    personHTML += '<p> BirthDate: ' + person.dob + '</p>';
    personHTML += '<p> address: ' + person.location.street + ', ' + person.location.city + ', ' + person.location.state + ', ' + person.location.postcode + '</p>';
    personHTML += '</div>';
    console.log(person.name.first);
}




