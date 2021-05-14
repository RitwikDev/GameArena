$(document).ready(function()
{
    gameId = document.getElementById("gameId").value;
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

    $("#tools").on("click", "button", function(e)
    {
        e.preventDefault();
        gameId = document.getElementById("gameId").value;
        gameName = $("#title").find("h1").html();
        console.log(gameName);
        let action = $(this).html();

        if(action == "Edit")
            window.location.href = "/showAdminUpdateGame?gameId="+gameId+"&gameName="+gameName;

        else if(action == "Delete")
            deleteModal(gameId, gameName);
    });

    $("#deleteModalConfirm").click(function(e)
    {
        let gameId = $("#deleteModalGameId").val();
        $.ajax(
        {
            url: "/deleteGame",
            type: "POST",
            data: gameId,
            success: function(response)
            {
                let responseJSON = JSON.parse(response);
                if(responseJSON.message == "Deleted")
                {
                    $("#deleteModal").modal("hide");
                    window.location.href = "/adminIndex";
                }
            },
            error: function(error)
            {
                console.log(error);
            }
        });
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
    let editButton = "<button type=\"button\" id=\"editButton\" class=\"btn btn-outline-secondary btn-lg btn-block\">Edit</button>";
    $("#tools").append(editButton);

    let deleteButton = "<button type=\"button\" id=\"deleteButton\" class=\"btn btn-outline-danger btn-lg btn-block\" data-toggle=\"modal\" data-target=\"#deleteModal\">Delete</button>";
    $("#tools").append(deleteButton);
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
            if(responseJSON)
            {
                $("#tools").empty();
                $("#tools").append("<div class=\"alert alert-success\" role=\"alert\">"+
                                        "Either this game is present in your cart or you have already purchased it."+
                                    "</div>");
            }
        },
        error: function(error)
        {
            console.log(error);
        }
    });
}

function deleteModal(gameId, gameName)
{
    $("#deleteModalLabel").html("Delete <em>"+gameName+"</em>?");
    $("#deleteModal .modal-body").html("Are you sure you want to delete <em>"+gameName+"</em>? This game will still be available in the database but it will not show up in website&#39;s listings.");
    $("#deleteModalGameId").val(gameId);
}