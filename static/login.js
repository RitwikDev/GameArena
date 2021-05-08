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
                    $("#usernameOrEmailAddress").addClass("is-invalid");
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
                    window.location.href = "/userHome";
            },
            error: function(error)
            {
                console.log("Error :"+error);
            }
        });
    });
});