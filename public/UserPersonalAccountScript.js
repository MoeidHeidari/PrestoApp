/*
@author: Moeid Heidari
Description: this file is used to send http post to login/registerUser to register a new user.
 */

function showLoading(themeName, timeout, message, reloadThePafeAfterClose) {
    HoldOn.open({
        theme: themeName,
        message: message
    });

    setTimeout(function () {
        HoldOn.close();
        if (reloadThePafeAfterClose)
            location.reload();
    }, timeout);
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#profileSelectedImage').attr('src', e.target.result);
            //e.target.result
            var data={image:e.target.result}
            showLoading('sk-cube-grid', 10000, 'we are working on it. Please wait :)', false);
            $.ajax("/users/changeProImage", {
                type: "POST",
                data:data,
                statusCode: {
                    200: function (response) {


                    },
                    201: function (response) {


                    },
                    400: function (response) {


                    },
                    404: function (response) {


                    },
                    402: function (response) {


                    }
                }, success: function (data) {
                    HoldOn.close();
                    tata.success('image changed successfully', '')


                },
                complete: function () {


                }
            });


        };

        reader.readAsDataURL(input.files[0]);
    }
}

$(document).ready(function ()
{

    $("#changePasswordButton").attr('disabled', true);
    const strongPwdRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_!@#\$%\^&\*])(?=.{8,})");

    $("#ChangePasswordForm").bind('keyup', function (e) {


        const password = $("#NewPassword").val();
        const confirm_password = $("#ConfirmPassword").val();

        if(strongPwdRegex.test(password) == true)
        {

            $("#newPasswordLabel").text(' ');
            if( confirm_password==password)
            {

                $("#confirmPasswordLabel").text(' ');
                $("#changePasswordButton").attr('disabled', false);
            }
            else
            {
                $("#confirmPasswordLabel").text('password is not matched ');
            }

        }
        else
        {
            $("#newPasswordLabel").text('invalid password');
        }



    });
    document.getElementById('profileImageInput').onchange = function () {


        readURL(this);


    };


    showLoading('sk-cube-grid', 10000, 'we are working on it. Please wait :)', false);


    $.ajax("/users/me", {
        type: "GET",
        statusCode: {
            200: function (response) {


            },
            201: function (response) {


            },
            400: function (response) {


            },
            404: function (response) {


            },
            402: function (response) {


            }
        }, success: function (data) {
            HoldOn.close();

            $('#UserInoFirstName').val(data.firstName);
            $('#UserInoLastName').val(data.lastName);
            $('#UserInoEmail').val(data.email);
            $('#UserInoPhoneNumber').val(data.phoneNumber);
            $('#profileSelectedImage').attr('src', data.proImage);


        },
        complete: function () {


        }
    });


});


function updateUserAccountInfo() {
    $('#userInfoUpdateForm').submit(function (e) {

        // Prevent form submission which refreshes page
        e.preventDefault();

        const formData = $(this).serialize();

        showLoading('sk-cube-grid', 10000, 'we are working on it. Please wait :)', false);
        $.ajax("/users/updateUserInfo", {
            type: "POST",
            data: formData,
            statusCode: {
                200: function (response) {


                },
                201: function (response) {


                },
                400: function (response) {


                },
                404: function (response) {


                },
                402: function (response) {


                }
            }, success: function (data) {
                HoldOn.close();

                tata.success('operation success', '')


            },
            complete: function () {


            }
        });
    });
}

function changeUserPassword()
{


    $('#ChangePasswordForm').submit(function (e) {

        // Prevent form submission which refreshes page
        e.preventDefault();

        const formData = $(this).serialize();

        showLoading('sk-cube-grid', 10000, 'we are working on it. Please wait :)', false);
        $.ajax("/login/changePass", {
            type: "POST",
            data: formData,
            statusCode: {
                200: function (response) {


                },
                201: function (response) {


                },
                400: function (response) {
                    HoldOn.close();
                    tata.error('invalid old password', '');

                },
                404: function (response) {


                },
                402: function (response) {


                }
            }, success: function (data) {
                HoldOn.close();

                tata.success('password has been changed successfully ', '');

                window.location.href = data.location;


            },
            complete: function () {


            }
        });
    });
}
