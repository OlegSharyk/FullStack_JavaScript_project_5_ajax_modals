/**
 * Created by debbieobrien on 10/07/2017.
 */
const url = 'https://randomuser.me/api/?nat=gb&results=12';
let $overlay = $('<div id="overlay"></div>');
let $modal = $('<div id="modal"></div>');
let personModalHTML ='';
let employeeList = [];  //array to store the data from the api
let filteredList = [];  //array to store the filtered data from the search
$('body').append($overlay); //append the overlay to the the people div
$overlay.append($modal); //append the modal to the overlay
$overlay.hide(); //hide the modal and overlay

const getEmployeeData = (data) =>{
    //get the data for each employee and call the displayData function to display it
    $.each(data.results, function(key) {
        employeeList.push(this);
    });

    displayData(employeeList);
    loadModal(employeeList);
};

const loadModal = (list) => {
    $('.person').on("click", function (e) {
        e.preventDefault();
        let id = $(this).attr('data-id');
        displayDataModal(id, list[id], list);
    })
};

const search = () => {
    let searchValue = $('#search').val();
    //if search is empty show all and hide no results message
    if (searchValue === '') {
        displayData(employeeList);
        loadModal(employeeList);
        $('.no-results').hide();
        return;
    }

    filteredList = []; //set to empty before we filter again
    employeeList.forEach(function (element) {
        //use regex to make sure name matches the the search value
        //must start with that letter and doesnt matter if upper or lower
        let regex = new RegExp('^' + searchValue, 'i');

        if (element.name.first.match(regex) || element.name.last.match(regex) || element.login.username.match(regex)) {
            filteredList.push(element);  //push the found values into the array
            $('.no-results').hide();
        }

        if (filteredList.length === 0){
            $('.no-results').show(); //if its empty show no results message
            $('.no-results').text('Sorry No Employee Found');
        }
    });
    displayData(filteredList); //call the function to display the data of the filtered list
    loadModal(filteredList); //call the function to display the modal of the filtered list

};

$('#search').on('keyup', search);

function dateOfBirth(person){
    //Reformat the date of birth
    let dob = person.dob;
    let day = dob.slice(8, -9);
    let month = dob.slice(5, -12);
    let year = dob.slice(0, 4);
    let newDOB = day + '/' + month + '/' + year;
    return newDOB;
}

function displayData(list){
    let personHTML = '';  //empty it
    $.each(list, function(key){
        let person = list[key]; // set person to the list with each key
        //key is added so we can keep track of how many there are
        personHTML += '<article class="person" data-id="' + key + '">';
        personHTML += '<img class="avatar" src ="' + person.picture.large + '">';
        personHTML += '<div><span class="name">' + person.name.first;
        personHTML += ' ' + person.name.last + '</span>';
        personHTML += '<p class="email">' + person.email + '</p>';
        personHTML += '<p class="city">' + person.location.city + '</p></div>';
        personHTML += '</article>';
    });

    $('#people').html(personHTML);  //add the html to the people div
}
function displayDataModal(id, person, list){
    personModalHTML = '<div class="person-modal">';
    personModalHTML += '<a href="#" class="close">X</a>';
    personModalHTML += '<a href="#" class="next">></a>';
    personModalHTML += '<a href="#" class="prev"><</a>';
    personModalHTML += '<img class="avatar" src ="' + person.picture.large + '">';
    personModalHTML += '<div class="info">';
    personModalHTML += '<p><span class="name">' + person.name.first + ' ' + person.name.last + '</span></p>';
    personModalHTML += '<p>' + person.email + '</p>';
    personModalHTML += '<p>' + person.location.city + '</p>';
    personModalHTML += '</div>';
    personModalHTML += '<div class="extra-info">';
    personModalHTML += '<p>' + person.cell + '</p>';
    personModalHTML += '<p>' + person.location.street + ' ' + person.location.city + ', ' + person.location.state + ' ' + person.location.postcode + '</p>';
    personModalHTML += '<p>Birthday: ' + dateOfBirth(person) + '</p>';
    personModalHTML += '</div>';
    personModalHTML += '</div>';

    $('#modal').html(personModalHTML);  //add the html to the modal

    if(list.length === 1){
        $('.next').hide();
        $('.prev').hide();
    }

    //show the modal and overlay on click
    $overlay.show();
    closeModal();
    nextModal(id, list);
    prevModal(id, list);
}

//Hide the modal and overlay if they click again and empty the html so as it clear it
function closeModal(){
    $('.close').click(function(e) {
        e.preventDefault();
        $overlay.hide();
        personModalHTML ='';
    });
}

//check which id is current and which list the filtered list or normal list
function nextModal(id, list){
    $('.next').click(function(e) {
        e.preventDefault();
        id++;

        id = id % list.length;  //if there is a remainder of 1 then go back to start

        displayDataModal(id, list[id], list);
    });
}
//check which id is current and which list the filtered list or normal list

function prevModal(id, list){
    $('.prev').click(function(e) {
        e.preventDefault();

        id--;
        if(id < 0){
            id = list.length -1;
        }
        displayDataModal(id, list[id], list);
    });
}
//get the JSON data and call the getEmployeeData function
$.getJSON(url, getEmployeeData);
