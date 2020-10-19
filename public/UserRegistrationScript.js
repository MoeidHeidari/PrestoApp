/*
@author: Moeid Heidari
Description: this file is used to send http post to login/registerUser to register a new user.
 */

$(document).ready(function () {
    // Listen to submit event on the <form> itself!
    $('#signinForm').submit(function (e) {

        // Prevent form submission which refreshes page
        e.preventDefault();

        $('#loadingText').text("Loading...");

        // Serialize data
        const formData = $(this).serialize();


        $.ajax("/login/registerUser", {
            type: "POST",
            data: formData,
            statusCode: {
                200: function (response) {


                },
                201: function (response) {


                },
                400: function (response) {

                    $("#register_btn").attr('disabled', false);
                    $('#loadingText').text("user is already existed");
                },
                404: function (response) {


                },
                402: function (response) {
                    $("#register_btn").attr('disabled', false);
                    $('#loadingText').text("error with validation");

                }
            }, success: function (data) {

                $("#register_btn").attr('disabled', false);
                $('#loadingText').text("");
                window.location.href = data.location;
            },
            complete: function () {
                $("#register_btn").attr('disabled', true);


            }
        });


    });
});