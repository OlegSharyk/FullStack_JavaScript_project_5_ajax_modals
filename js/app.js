/**
 * Created by debbieobrien on 10/07/2017.
 */
const url = 'https://randomuser.me/api/?results=12';
let personHTML ='';
let personModalHTML ='';
let personID;
let allData = [];

let $overlay = $('<div id="overlay"></div>');
let $modal = $('<div id="modal"></div>');

const getEmployeeData = (data) =>{
    //get the data for each employee and call the displayData function to display it
    $.each( data.results, function( key, person ) {
        displayData(person);
    });
    //append the employees to the people div
    $('#people').append(personHTML);

    $('.person').on("click", function(e){
        e.preventDefault();
        console.log($(this));
        //displayDataModal(person)
        $.each(data.results, function( i, person ) {
            displayDataModal(person)
        });
        $('#modal').html(personModalHTML);
        //show the modal and overlay on click
        $overlay.show();
    });

};

$.getJSON(url, getEmployeeData);

function displayData(person){
    personHTML += '<a href="#" class="person">';
    personHTML += '<img src ="' + person.picture.large + '">';
    personHTML += '<div><span class="name">' + person.name.first;
    personHTML += ' ' + person.name.last + '</span>';
    personHTML += '<p class="email">' + person.email + '</p>';
    personHTML += '<p class="city">' + person.location.city + '</p></div>';
    personHTML += '<span id="id" value="' + person.login.username + '"></span>';
    personHTML += '</a>';
}
function displayDataModal(person){
    personModalHTML += '<a href="#"><div class="person">';
    personModalHTML += '<p><span>' + person.name.first + ' </span>';
    personModalHTML += '<span>' + person.name.last + '</span></p>';
    personModalHTML += '<p>' + person.email + '</p>';
    personModalHTML += '<p> Location: ' + person.location.city + '</p>';
    personModalHTML += '<img src ="' + person.picture.large + '">';
    personModalHTML += '<p>' + person.login.username + '</p>';
    personModalHTML += '<p>' + person.cell + '</p>';
    personModalHTML += '<p>' + person.dob + '</p>';
    personModalHTML += '<p>' + person.location.street + ', ' + person.location.city + ', ' + person.location.state + ', ' + person.location.postcode + '</p>';
    personModalHTML += '</div></a>';
}


//hide the modal and overlay
$overlay.hide();
//append the modal to the overlay
$overlay.append($modal);
//append the overlay to the the people div
$('#people').append($overlay);

//Hide the modal and overlay if they click again
$overlay.click(function(){
    $overlay.hide();
});




//let image = $('img');
//$image.attr('src', image);
//$name.text(name);
//console.log($(this).textContent);
//console.log($(this))


/*$.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function(data) {

        //console.log(allData[0]);
        $.each( data.results, function( i, person ) {
            //allData = data;
            //allData[person['login']['md5']] = person;
            //console.log(allData)
            displayData(person)

        });
        let $person = $('.person');
        //console.log($person);
        $person.on("click", function(e){
            e.preventDefault();
            // displayDataModal(this);
            //let selectedPerson = e.target.document.getElementById('id').value;
            //console.log(selectedPerson)
            $.each( data.results, function( i, person ) {
                displayDataModal(person)
            });
            $overlay.show();
        });

    }

});*/

