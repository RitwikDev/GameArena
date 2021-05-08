$(document).ready(function()
{
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
});

function displayEmptyCart()
{
    $("#cartContents").append("<p class=\"card-text\">Your cart is empty.</p>");
}

function displayCart(data)
{
    let total = 0;
    $("#cartContents").append("<h5 class=\"card-title\">Game<span class=\"float-right\">Price</span></h5>");
    for(let i=0; i<data.length; i=i+1)
    {
        $("#cartContents").append("<p class=\"card-text\">"+
                                        data[i][0]+
                                        "<span class=\"float-right\">$"+data[i][1]+"</span>"+
                                    "</p>");
        total = total + data[i][1];
    }
    $("#totalPrice").text("$"+total);
}