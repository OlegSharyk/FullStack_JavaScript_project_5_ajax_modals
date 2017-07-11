/**
 * Created by debbieobrien on 10/07/2017.
 */
let personHTML;
let personModalHTML;
let allData = [];
$.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function(data) {

        //console.log(allData[0]);
        $.each( data.results, function( i, person ) {
            //allData = data;
            //console.log(allData)
            console.log(person)
            allData[person['id']['value']] = person;
            //console.log(allData)

            displayData(person)

        });
        let $person = $('.person');
        //console.log($person);
        $person.on("click", function(e){
            e.preventDefault();
           // displayDataModal(this);
            let selectedPerson = $('id').val();
            console.log(selectedPerson)
            $.each( data.results, function( i, person ) {
            displayDataModal(person)
            });
            $overlay.show();
        });

    }

});


function displayData(person){
    personHTML += '<div class="person"><a href="#">';
    personHTML += '<div id="id" value="' + person.login.md5 + '"></div>';
    personHTML += '<img src ="' + person.picture.large + '">';
    personHTML += '<div><span class="name">' + person.name.first;
    personHTML += ' ' + person.name.last + '</span>';
    personHTML += '<p class="email">' + person.email + '</p>';
    personHTML += '<p class="city">' + person.location.city + '</p></div>';
    personHTML += '</a></div>';
    $('#people').html(personHTML);
}
function displayDataModal(person){
    personModalHTML += '<a href="#"><div class="person">';
    personModalHTML += '<p><span>Name: ' + person.name.first + ' </span>';
    personModalHTML += '<span>' + person.name.last + '</span></p>';
    personModalHTML += '<p> Email: ' + person.email + '</p>';
    personModalHTML += '<p> Location: ' + person.location.city + '</p>';
    personModalHTML += '<img src ="' + person.picture.large + '">';
    personModalHTML += '<p> Username: ' + person.login.username + '</p>';
    personModalHTML += '<p> CellNumber: ' + person.cell + '</p>';
    personModalHTML += '<p> BirthDate: ' + person.dob + '</p>';
    personModalHTML += '<p> address: ' + person.location.street + ', ' + person.location.city + ', ' + person.location.state + ', ' + person.location.postcode + '</p>';
    personModalHTML += '</div></a>';
    $('#modal').html(personModalHTML);
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




