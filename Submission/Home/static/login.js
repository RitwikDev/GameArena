$(document).ready(function()
{
    $("#loginButton").click(function(e)
    {
        e.preventDefault();

        $.ajax(
        {
            url: "/validateLogin",
            data: $("form").serialize(),
            type: "POST",
            success: function(response)
            {
                let responseJSON = JSON.parse(response);
                if(responseJSON.message == "Wrong credentials")
                {
                    $("#username").addClass("is-invalid");
                    $("#password").addClass("is-invalid");

                    $("#wrongCredentials").remove();
                    $("#loginForm").append("<div class=\"row\">"+
                                                "<div class=\"col-2\"></div>"+
                                                "<div class=\"col-8\">"+
                                                    "<div id=\"wrongCredentials\" class=\"alert alert-danger\" role=\"alert\">"+
                                                        responseJSON.message+
                                                    "</div>"+
                                                "</div>"+
                                                "<div class=\"col-2\"></div>"+
                                            "</div>");
                }

                else
                {
                    console.log(responseJSON);
                    if(responseJSON.admin == "True")
                        window.location.href = "/adminIndex"
                        
                    else if(responseJSON.admin == "False")
                        window.location.href = "/userHome";
                }
            },
            error: function(error)
            {
                console.log("Error :"+error);
            }
        });
    });
});