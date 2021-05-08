$(document).ready(function()
{
    gameId = document.getElementById("gameId").value;
    console.log("gameId = "+gameId);

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
        },
        error: function(error)
        {
            console.log(error);
        }
    });
});

function showDetails(data)
{
    $("#title").append("<h1>"+data[0][1]+"</h1>");
    $("#photos").append("<div id=\"carouselOuter\" class=\"carousel slide\" data-ride=\"carousel\">"+
                                    "<div id=\"carouselInner\" class=\"carousel-inner\">"+
                                    "</div>"+
                                "</div>");

    let x = 0;
    for(let i=0; i<data.length; i=i+1)
    {
        let carousel = "<div class=\"carousel-item\">"+
                            "<img class=\"d-block w-100\" src=\""+data[i][6]+"\" alt=\""+data[i][7]+"\" height=\"500px\" width=\"800px\">"+
                        "</div>";
        $("#carouselInner").append(carousel);
        if(x == 0)
        {
            x = 1;
            $(".carousel-item").addClass("active");

            let card = "<div class=\"card\">"+
                            "<div class=\"card-body\">"+
                                "<h5 class=\"card-title\">Description</h5>"+
                                "<p class=\"card-text\">"+data[0][2]+"</p>"+
                            "</div>"+
                            "<div class=\"card-footer\">"+
                                "<small class=\"text-muted\">Price: $"+data[0][3]+
                                    "<span class=\"float-right\">Rating: "+data[0][4]+"/5</span>"+
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