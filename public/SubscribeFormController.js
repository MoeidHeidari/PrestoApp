/*
@author: Moeid Heidari
Description: this file is used to validate the users entered information.
 */

$(function () {

    const emailRegex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const strongPwdRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_!@#\$%\^&\*])(?=.{8,})");

    // To enable or disable login button
    $("#signinForm").bind('keyup', function (e) {

        const email = $("#subscribe_email").val();
        const password = $("#subscribe_password").val();
        const confirm_password = $("#subscribe_confirm_password").val();
        const first_name = $("#subscribe_first_name").val();
        const last_name = $("#subscribe_last_name").val();
        const phone_number = $("#subscribe_phone_number").val();


        if (emailRegex.test(email) == true && strongPwdRegex.test(password) == true) {
            $("#register_btn").attr('disabled', false);
        } else {
            $("#register_btn").attr('disabled', true);
        }
    });


//======================================================================================================================
    // To validate email entry
    $("#subscribe_email").on("keyup", function (e) {

        const email = $("#subscribe_email").val();

        if (email.length == 0) {
            $("#email_error").text("");
        } else if (emailRegex.test(email) == false) {
            $("#email_error").text("Invalid email");
        } else {
            $("#email_error").text("");
        }
    });

//======================================================================================================================
    // To validate password entry
    $("#subscribe_password").on("keyup", function (e) {

        const passwordValue = $("#subscribe_password").val();

        if (passwordValue.length == 0) {
            $("#passsword_error").text("");
        } else if (passwordValue.length < 8) {
            $("#passsword_error").text("8 characters at least");
        } else if (strongPwdRegex.test(passwordValue) == false) {
            $("#passsword_error").text("Unsecured password");
        } else {
            $("#passsword_error").text("");
        }
    });


});

