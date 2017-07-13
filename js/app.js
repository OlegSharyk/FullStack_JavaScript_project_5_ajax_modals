/**
 * Created by debbieobrien on 10/07/2017.
 */
const url = 'https://randomuser.me/api/?nat=gb&results=12';
let personHTML ='';
let personModalHTML ='';
let $overlay = $('<div id="overlay"></div>');
let $modal = $('<div id="modal"></div>');
let employeeList = [];

const getEmployeeData = (data) =>{
    //get the data for each employee and call the displayData function to display it
    $.each(data.results, function(key) {
        employeeList.push($(this));
        employeeList[key].push({employeeID: key});
    });
    $.each(employeeList, function (key) {
        displayData(employeeList[key][0], employeeList[key][1]);
    });

    $('#people').append(personHTML);

    $('.person').on("click", function(e){
        e.preventDefault();
        let employeeID = $(this).children('#id').val();

        $.each(employeeList, function( key, person ) {
            let personID = employeeList[key][1]
            $.each(personID, function( key, person ) {
                let personIDValue = personID[key];
                    if(Number(employeeID) === personIDValue){
                        //displayDataModal(employeeList);
                        console.log(personIDValue)
                        console.log(employeeID)
                        console.log('ok')
                        displayDataModal(employeeList[employeeID][0]);
                    }


            })
        });
        $('#modal').html(personModalHTML);
        //show the modal and overlay on click
        $overlay.show();
        closeModal();
        nextModal();
    });
};

//displayData(employeeList[0]);
function displayData(person, key){
    personHTML += '<a href="#" class="person">';
    personHTML += '<input type="hidden" id="id" value="' + key.employeeID + '">';
    personHTML += '<img class="avatar" src ="' + person.picture.large + '">';
    personHTML += '<div><span class="name">' + person.name.first;
    personHTML += ' ' + person.name.last + '</span>';
    personHTML += '<p class="email">' + person.email + '</p>';
    personHTML += '<p class="city">' + person.location.city + '</p></div>';
    personHTML += '</a>';
}

$.getJSON(url, getEmployeeData);
let filteredList = [];
$('#submit').click(function(e){
    e.preventDefault();
    let searchValue = $('#search').val();


    for(let i = 0; i < $('.person').length; i+=1){
        let firstName = employeeList[i][0].name.first;
        let secondName = employeeList[i][0].name.last;
        let fullName = firstName + ' ' + secondName;
        if(fullName.indexOf(searchValue) > -1 && searchValue){
            $('.person').show();
            console.log(fullName);
            //fullName.parents
        }
    }
    employeeList.forEach(function(element) {
        let firstName = $(element).find('.person').children('.name').text();
        if (firstName.indexOf(searchValue) > -1 && searchValue){
            filteredList.push($(element));
            console.log(filteredList)
            }

    })

});


function displayDataModal(person){
    //Reformat the date of birth
    function dateOfBirth(){
        let dob = person.dob;
        let day = dob.slice(8, -9);
        let month = dob.slice(5, -12);
        let year = dob.slice(0, 4);
        let newDOB = day + '/' + month + '/' + year;
        return newDOB
    }

    personModalHTML += '<div class="person-modal">';
    personModalHTML += '<a href="#" class="close">X</a>';
    personModalHTML += '<a href="#" class="next">next</a>';
    personModalHTML += '<a href="#" class="prev">prev</a>';
    personModalHTML += '<img class="avatar" src ="' + person.picture.large + '">';
    personModalHTML += '<div class="info">';
    personModalHTML += '<p><span class="name">' + person.name.first + ' ' + person.name.last + '</span></p>';
    personModalHTML += '<p>' + person.email + '</p>';
    personModalHTML += '<p>' + person.location.city + '</p>';
    personModalHTML += '</div>';
    personModalHTML += '<div class="extra-info">';
    personModalHTML += '<p>' + person.cell + '</p>';
    personModalHTML += '<p>' + person.location.street + ' ' + person.location.city + ', ' + person.location.state + ' ' + person.location.postcode + '</p>';
    personModalHTML += '<p>Birthday: ' + dateOfBirth() + '</p>';
    personModalHTML += '</div>';
    personModalHTML += '</div>';
}


//hide the modal and overlay
$overlay.hide();
//append the modal to the overlay
$overlay.append($modal);
//append the overlay to the the people div
$('#people').append($overlay);
//Hide the modal and overlay if they click again and empty the html so as it clear it
function closeModal(){
    $('.close').click(function(e) {
        e.preventDefault();
        $overlay.hide();
        personModalHTML ='';
    });
}
function nextModal(){
    $('.next').click(function(e) {
        e.preventDefault();
        personModalHTML='';

        console.log('clicked')
    });
}
