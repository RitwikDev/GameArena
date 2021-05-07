$(document).ready(function()
{
    $("#createAccountButton").click(function(e)
    {
        $("#usernameTaken").remove();
        username = document.getElementById("username").value;
        console.log("username = "+username);
        e.preventDefault();
        $.ajax(
        {
            url: '/checkUsername',
            data: username,
            type: "POST",
            success: function(response)
            {
                parsedResponse = JSON.parse(response);
                console.log("parsedResponse = "+(parsedResponse.response.length == 0));
                if(parsedResponse.response.length == 0)
                {
                    console.log("Creating a new user");
                    $.ajax(
                        {
                                url: '/signup',
                                data: $('form').serialize(),
                                type: 'POST',
                                success: function(response) {
                                    console.log(response);
                                },
                                error: function(error) {
                                    console.log(error);
                                }
                        });
                }

                else
                {
                    console.log("response = "+response);
                    console.log("Username already exists\n"+response);
                    $("#usernameDiv").append("<small id=\"usernameTaken\" class=\"form-text text-danger\">"+
                                                "Username <em>"+username+"</em> has already been taken. Please try another username."+
                                            "</small>");
                }
            },
            error: function(error)
            {
                console.log(error);
            }
        });
    });
});

var validFirstName = false, validLastName = false, validEmailId = false, validPassword = false, validConfirmPassword = false, validDateOfBirth = false;
function elementChanged(x)
{   
    switch(x.id)
    {
        case "firstName":   validFirstName = validateFirstName(x);
                            break;

        case "lastName":    validLastName = validateLastName(x);
                            break;
                        
        case "emailId":     validEmailId = validateEmailId(x);
                            break;

        case "password":    validPassword = validatePassword(x);
                            break;

        case "confirmPassword": validConfirmPassword = validateConfirmPassword(x);
                                break;

        case "dateOfBirth":     validDateOfBirth = validateDateOfBirth(x);
                                break;
                            
        default:    console.log("x.id = "+x.id);
    }

    if(validFirstName && validLastName && validEmailId && validPassword && validConfirmPassword && validDateOfBirth)
        document.getElementById("createAccountButton").disabled = false;
    
    else
        document.getElementById("createAccountButton").disabled = true;
}

function validateFirstName(x)
{
    var name = /^[A-Za-z]{1,}$/;
    if(x.value.length == 0 || !name.test(x.value))
    {
        document.getElementById("createAccountButton").disabled = true;
        $("#firstNameError").remove();
        $("#firstNameDiv").append("<small id=\"firstNameError\" class=\"form-text text-danger\">"+
                                        "First name is invalid."+
                                    "</small>");
        return false;
    }

    else
    {
        $("#firstNameError").remove();
        return true;
    }
}

function validateLastName(x)
{
    var name = /^[A-Za-z]{1,}$/;
    if(x.value.length == 0 || !name.test(x.value))
    {
        document.getElementById("createAccountButton").disabled = true;
        $("#lastNameError").remove();
        $("#lastNameDiv").append("<small id=\"lastNameError\" class=\"form-text text-danger\">"+
                                        "Last name is invalid."+
                                    "</small>");
        return false;
    }

    else
    {
        $("#lastNameError").remove();
        return true;
    }
}

function validateEmailId(x)
{
    let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailReg.test(x.value))
    {
        document.getElementById("createAccountButton").disabled = true;
        $("#emailIdError").remove();
        $("#emailIdDiv").append("<small id=\"emailIdError\" class=\"form-text text-danger\">"+
                                        "Please enter a valid Email Address."+
                                    "</small>");
        return false;
    }

    else
    {
        $("#emailIdError").remove();
        return true;
    }
}

function validatePassword(x)
{
    if(x.value.length < 8 || x.value.length > 20)
    {
        document.getElementById("createAccountButton").disabled = true;
        $("#passwordError").remove();
        $("#passwordDiv").append("<small id=\"passwordError\" class=\"form-text text-danger\">"+
                                        "Please enter a valid password."+
                                    "</small>");
        return false;
    }

    else
    {
        $("#passwordError").remove();
        return true;
    }
}

function validateConfirmPassword(x)
{
    var password = document.getElementById("password").value;
    if(x.value != password)
    {
        document.getElementById("createAccountButton").disabled = true;
        $("#confirmPasswordError").remove();
        $("#confirmPasswordDiv").append("<small id=\"confirmPasswordError\" class=\"form-text text-danger\">"+
                                            "Passwords do not match."+
                                        "</small>");
        return false;
    }

    else
    {
        $("#confirmPasswordError").remove();
        return true;
    }
}

function validateDateOfBirth(x)
{
    if(x.value.length == 0)
        return false;
    
    else
    {
        var parts = x.value.split('-');
        var dateOfBirth = new Date(parts[0], parts[1] - 1, parts[2]);
        var today = new Date();

        if(dateOfBirth < today)
        {
            $("#dateOfBirthError").remove();
            return true;
        }

        else
        {
            document.getElementById("dateOfBirthDiv").disabled = true;
            $("#dateOfBirthError").remove();
            $("#dateOfBirthDiv").append("<small id=\"dateOfBirthError\" class=\"form-text text-danger\">"+
                                                "Date of birth should be earlier than today."+
                                            "</small>");
            return false;
        }
    }
}