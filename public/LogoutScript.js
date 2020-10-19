/*
@author: Moeid Heidari
Description: this file is used to send http post to login/registerUser to register a new user.
 */





function logoutOperation() {


    $.ajax("/myAccount/logout", {
        type: "GET",
        statusCode: {
            200: function (response) {


            },
            201: function (response) {


            },
            400: function (response) {



            },
            401: function (response) {


            },
            402: function (response) {



            }
        }, success: function (data) {
            window.location.href = data.location;
        },
        complete: function () {



        }
    });
}


