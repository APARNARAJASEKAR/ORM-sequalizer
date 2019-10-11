$(document).ready(function() {

    $("#register").click(function() {
        console.log("----------called the submit function----------");
        event.preventDefault();
        let arr = [];
        var Roles = ($('.input-roles input[type=text]').last().attr('id'));
        for (var i = 1; i <= Roles; i++) {
            arr.push($(`#${i}`).val());
        }

        console.log(arr);
        var value = {
            name: $("#name").val(),
            email: $("#address").val(),
            experience: $("#experience").val(),
            roles: arr
        }
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {


            }
        }
        xmlhttp.open('POST', 'register_clinician', true);


        xmlhttp.setRequestHeader('content-type', 'application/json');
        xmlhttp.send(JSON.stringify(value));
        console.log(value);




    });



    $("#display").click(function() {
        console.log("-----called the display value function----------");
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var json1 = (JSON.parse(xmlhttp.responseText));
                console.log(json1);




            }
        }
        xmlhttp.open('GET', '/display_all', true);
        xmlhttp.setRequestHeader('content-type', 'application/json');
        xmlhttp.send();
    });
    $("#update").click(function() {
        console.log("--------update function calls-----");

        var update_values = {
            name: $("#name").val(),
            email: $("#address").val(),
            experience: $("#experience").val(),
            roles: arr
        }
        console.log(update_values);
    });





    $("#add").on("click", function(event) {

        console.log('---------------->', ($('.input-roles input[type=text]').last().attr('id')));
        event.stopImmediatePropagation();
        $(".roles1").append(`<div class="input-roles steps"><input type="text" class="roles steps" id="${parseInt($('.input-roles input[type=text]').last().attr('id'))+1}"> <button class="mybutton1" type="button" id="delete">DELETE</button><div>`);
    });

    $('body').on('click', '.mybutton1', function() {
        console.log("---calls the remove function----");
        $(".role steps").remove();
        $("#delete").remove();
    });




});