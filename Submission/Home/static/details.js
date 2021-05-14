$(document).ready(function()
{
    gameId = document.getElementById("gameId").value;
    showNav();

    $.ajax(
    {
        url: "/details",
        type: "POST",
        data: gameId,
        success: function(response)
        {
            var responseJSON = JSON.parse(response);
            console.log(responseJSON);
            showDetails(responseJSON);
            showTools(responseJSON);
            checkUserCartPurchased(responseJSON);
        },
        error: function(error)
        {
            console.log(error);
        }
    });
});

function showNav()
{
    let status = document.getElementById("status").value;
    if(status == "True")
    {
        document.getElementById("guestNav").style.display = "none";
        document.getElementById("userNav").style.display = "block";
    }
    else
    {
        document.getElementById("guestNav").style.display = "block";
        document.getElementById("userNav").style.display = "none";
    }
}

function showDetails(data)
{
    console.log(data);
    $("#title").append("<h1>"+data[0][1]+"</h1>");
    $("#photos").append("<div id=\"carouselOuter\" class=\"carousel slide\" data-ride=\"carousel\">"+
                                    "<div id=\"carouselInner\" class=\"carousel-inner\">"+
                                    "</div>"+
                                "</div>");

    let x = 0;
    for(let i=0; i<data.length; i=i+1)
    {
        let carousel = "<div class=\"carousel-item\">"+
                            "<img class=\"d-block w-100\" src=\""+data[i][7]+"\" alt=\""+data[i][8]+"\" height=\"500px\" width=\"800px\">"+
                        "</div>";
        $("#carouselInner").append(carousel);
        if(x == 0)
        {
            x = 1;
            let ratingValue = "";
            if(data[0][4] == null || data[0][4].length == 0 || data[0][4] == "")
                ratingValue = "N/A";
            else
                ratingValue = ""+data[0][4]+"/5";
            $(".carousel-item").addClass("active");

            let card = "<div class=\"card\">"+
                            "<div class=\"card-body\">"+
                                "<h5 class=\"card-title\">Description</h5>"+
                                "<p class=\"card-text\">"+data[0][2]+"</p>"+
                            "</div>"+
                            "<div class=\"card-footer\">"+
                                "<small class=\"text-muted\">Price: $"+data[0][3]+
                                    "<span class=\"float-right\">Rating: "+ratingValue+"</span>"+
                                "</small>"+
                            "</div>"+
                        "</div>";
            $("#details").append(card);
        }
    }

    let controls = "<a class=\"carousel-control-prev\" href=\"#carouselOuter\" role=\"button\" data-slide=\"prev\">"+
                        "<span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>"+
                        "<span class=\"sr-only\">Previous</span>"+
                    "</a>"+
                    "<a class=\"carousel-control-next\" href=\"#carouselOuter\" role=\"button\" data-slide=\"next\">"+
                        "<span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>"+
                        "<span class=\"sr-only\">Next</span>"+
                    "</a>";

    $("#carouselOuter").append(controls);
}

function showTools(data)
{
    let listGroupCart = "<ul class=\"list-group\">"+
                        "<li href=\"#\" class=\"list-group-item list-group-item-action active\">"+
                            "Like this game?"+
                        "</li>"+
                        "<a href=\"/addToCart?gameId="+data[0][0]+"\" class=\"list-group-item list-group-item-action\">Add to cart</a>"+
                    "</ul>";

    $("#tools").append(listGroupCart);

    let listGroupFavourite = "<ul class=\"list-group\" style=\"margin-top: 5%;\">"+
                                "<li href=\"#\" class=\"list-group-item list-group-item-action active\">"+
                                    "Want to buy it later?"+
                                "</li>"+
                                "<a href=\"#\" class=\"list-group-item list-group-item-action\">Add to favourites</a>"+
                            "</ul>";

    $("#tools").append(listGroupFavourite);
}

function checkUserCartPurchased(data)
{
    $.ajax(
    {
        url: "/checkUserCartPurchased",
        type: "POST",
        data: data[0][0],
        success: function(response)
        {
            let responseJSON = JSON.parse(response).message;
            //Already in cart or purchased
            if(responseJSON == "in cart")
            {
                $("#tools").empty();
                $("#tools").append("<div class=\"alert alert-success\" role=\"alert\">"+
                                        "This game is already present in your cart."+
                                    "</div>");
            }

            else if(responseJSON == "purchased")
            {
                $("#tools").empty();
                $("#tools").append("<div class=\"alert alert-success\" role=\"alert\">"+
                                        "You have already purchased this game."+
                                    "</div>");
            }
        },
        error: function(error)
        {
            console.log(error);
        }
    });
}