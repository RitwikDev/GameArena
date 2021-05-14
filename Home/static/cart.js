$(document).ready(function()
{
    function getCartContents()
    {
        $("#cartContents").empty();
        $.ajax(
        {
            url: "/getCartContents",
            success: function(response)
            {
                var responseJSON = JSON.parse(response).message;
                console.log(responseJSON);

                if(responseJSON == "Cart is empty")
                    displayEmptyCart();
                else
                    displayCart(responseJSON);
            },
            error: function(error)
            {
                console.log(error);
            }
        });
    }

    $("#cartContents").on("click", ".removeFromCart", function(e)
    {
        e.preventDefault();
        let gameId = $(this).parent().siblings("#gameId").val();
        $.ajax(
        {
            url: "/removeFromCart",
            type: "POST",
            data: gameId,
            success: function(response)
            {
                getCartContents();
            },
            error: function(error)
            {
                console.log(error);
            }
        });
    });

    getCartContents();

    $("#buyButton").click(function()
    {
        $.ajax(
        {
            url: "/buyNow",
            success: function(response)
            {
                console.log(response);
                $("#successAlert").css("display", "block");
                getCartContents();
            },
            error: function(error)
            {
                console.log(error);
            }
        });
    });
});

function displayEmptyCart()
{
    $("#cartContents").append("<p class=\"card-text\">Your cart is empty.</p>");
    $("#totalPrice").text("$0");
    $("#buyButton").css("display", "none");
}

function displayCart(data)
{
    let total = 0;
    for(let i=0; i<data.length; i=i+1)
    {
        $("#cartContents").append("<div class=\"d-flex justify-content-between\">"+
                                    "<input type=\"hidden\" id=\"gameId\" value=\""+data[i][2]+"\">"+
                                    "<p class=\"card-text\">"+
                                        data[i][0]+
                                    "</p>"+
                                    "<p class=\"card-text\">$"+
                                        data[i][1]+
                                    "</p>"+
                                    "<p class=\"card-text\">"+
                                        "<button type=\"button\" class=\"btn btn-danger btn-sm removeFromCart\">X</button>"+
                                    "</p>"+
                                "</div>");
        total = total + data[i][1];
    }
    $("#totalPrice").text("$"+total);
    $("#buyButton").css("display", "block");
}