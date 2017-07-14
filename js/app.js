/**
 * Created by debbieobrien on 10/07/2017.
 */
const url = 'https://randomuser.me/api/?nat=gb&results=12';
let personHTML ='';
let personModalHTML ='';
let $overlay = $('<div id="overlay"></div>');
let $modal = $('<div id="modal"></div>');
let employeeList = [];  //array to store the data from the api
let filteredList = [];  //array to store the filtered data from the search
$('body').append($overlay); //append the overlay to the the people div
$overlay.append($modal); //append the modal to the overlay
$overlay.hide(); //hide the modal and overlay

const getEmployeeData = (data) =>{
    //get the data for each employee and call the displayData function to display it
    $.each(data.results, function(key) {
        employeeList.push($(this));
        employeeList[key].push({employeeID: key});
    });

    loadAllEmployees(employeeList);
    loadModal();

};

const loadAllEmployees = (list) => {
    $.each(list, function (key) {
        displayData(list[key][0], list[key][1]);
    });
    $('#people').append(personHTML);
};

const loadModal = () => {
    $('.person').on("click", function(e){
        e.preventDefault();
        let employeeID = $(this).children('#id').val();

        $.each(employeeList, function(key) {
            let personID = employeeList[key][1]; //key is stored in second part of object
            $.each(personID, function(key) {
                let personIDValue = personID[key];
                employeeID = Number(employeeID);
                if(employeeID === personIDValue){
                    displayDataModal(employeeList[employeeID][0]);
                }
            })
        });
        $('#modal').html(personModalHTML);
        //show the modal and overlay on click
        $overlay.show();
        closeModal();
        nextModal(employeeID);
        prevModal(employeeID);
    });
};


const hideAll = (list) => {
    list.forEach(function (element) {
        $('.person').hide();
    })
};

const search = () => {
        let searchValue = $('#search').val();

       /* /!*for(let i = 0; i < $('.person').length; i+=1){
         let firstName = employeeList[i][0].name.first;
         let secondName = employeeList[i][0].name.last;
         let email = employeeList[i][0].email;
         let fullName = firstName + ' ' + secondName;
         if(fullName.indexOf(searchValue) > -1 && searchValue || email.indexOf(searchValue) > -1){
         $('.person').show();
         console.log(fullName);
         }else{

         }
         }*!/*/

        employeeList.forEach(function (element) {
            let firstName = $(element).find('.person').children('.name').text();
            console.log(firstName)
            hideAll(employeeList);
            if (firstName.indexOf(searchValue) > -1 && searchValue) {
                filteredList.push($(element));
                //console.log(filteredList)
            }
            loadAllEmployees(filteredList);
        })
};

$('#search').keyup(search);




function dateOfBirth(person){
    //Reformat the date of birth
    let dob = person.dob;
    let day = dob.slice(8, -9);
    let month = dob.slice(5, -12);
    let year = dob.slice(0, 4);
    let newDOB = day + '/' + month + '/' + year;
    return newDOB;
}

function displayData(person, key){
    personHTML += '<article class="person">';
    personHTML += '<input type="hidden" id="id" value="' + key.employeeID + '">';
    personHTML += '<img class="avatar" src ="' + person.picture.large + '">';
    personHTML += '<div><span class="name">' + person.name.first;
    personHTML += ' ' + person.name.last + '</span>';
    personHTML += '<p class="email">' + person.email + '</p>';
    personHTML += '<p class="city">' + person.location.city + '</p></div>';
    personHTML += '</article>';
}
function displayDataModal(person){
    personModalHTML += '<div class="person-modal">';
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
}




//Hide the modal and overlay if they click again and empty the html so as it clear it
function closeModal(){
    $('.close').click(function(e) {
        e.preventDefault();
        $overlay.hide();
        personModalHTML ='';
    });
}
function nextModal(employeeID){
    $('.next').click(function(e) {
        e.preventDefault();
        employeeID +=1;
        if(employeeID < employeeList.length){
            displayDataModal(employeeList[employeeID][0]);
            console.log(employeeList[employeeID][0])
        }else{
            employeeID = 0;
        }
        return employeeID;
    });
}
function prevModal(employeeID){
    $('.prev').click(function(e) {
        e.preventDefault();
        employeeID -=1;
        if(employeeID > 0){
            displayDataModal(employeeList[employeeID][0]);
            console.log(employeeList[employeeID][0])
        }else{
            employeeID = employeeList.length;
        }
        return employeeID;
    });
}

$.getJSON(url, getEmployeeData);
