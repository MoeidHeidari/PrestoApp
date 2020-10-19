/*
@author: Moeid Heidari
Description: this file is used to send http post to login/registerUser to register a new user.
 */

$(document).ready(function () {
    // Listen to submit event on the <form> itself!
    $('#loginForm').submit(function (e) {

        // Prevent form submission which refreshes page
        e.preventDefault();

        $('#loginLoadingText').text("Loading...");

        // Serialize data
        const formData = $(this).serialize();


        $.ajax("/login/auth", {
            type: "POST",
            data: formData,
            statusCode: {
                200: function (response) {


                },
                201: function (response) {


                },
                400: function (response) {


                    $('#loginLoadingText').text("Invalid email or password");
                },
                401: function (response) {

                    $('#loginLoadingText').text("Access denied");
                },
                402: function (response) {

                    $('#loginLoadingText').text("user is not activated yet");

                }
            }, success: function (data) {


                $('#loginLoadingText').text("");
                window.location.href = data.location;
            },
            complete: function () {



            }
        });


    });
});