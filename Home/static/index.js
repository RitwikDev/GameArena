$(document).ready(function()
{
    showNav();
    function loadFeaturedGamesImages()
    {
        $.ajax(
            {
                url: "/loadFeaturedGamesImages",
                method: "GET",
                success: function(response)
                {
                    console.log(response);
                    response = JSON.parse(response);
                    response.forEach(i =>
                    {
                        // <div class="swiper-slide"><img src="../images/1.jpg" style="width: 350px; height: 300px;"></div>
                        $("#featuredGames").append("<div class=\"swiper-slide\">"+
                                                        "<img class=\"featuredGameImage\" src=\""+i[3]+"\" alt=\""+i[0]+"\">"+
                                                        "<div class=\"carousel-caption\">"+
                                                            "<div class=\"w-100 h3 rounded bg-warning\"><a href=\"\" class=\"text-dark alert-link\">"+i[1]+"</a></div>"+
                                                        "</div>"+
                                                    "</div>");
                    });
                    
                    // $("body").append("<script src=\"https://unpkg.com/swiper/swiper-bundle.min.js\"></script>");
                    $("body").append("<script src=\"../static/SwipperForHomePage.js\"></script>");
                },
                error: function(e)
                {
                    console.log("Error: "+e);
                }
            }
        );
    }
    
    //S2
    function loadActionGamesImages()
    {
        $.ajax(
            {
                url: "/loadActionGamesImages",
                method: "GET",
                success: function(response)
                {
                    var index = 0;
                    console.log(response);
                    response = JSON.parse(response);
                    response.forEach(i =>
                    {
                        if(index == 0)
                        {
                            $("#actionGenreCrousel").find("ol").append("<li data-target=\"#actionGenreCarousel\" data-slide-to=\""+index+"\" class=\"active\"></li>");
                            index = index + 1;
                            $("#actionGenreCrousel").find("#actionGenreCarouselInner").append("<div class=\"carousel-item active\">"+
                                                                        "<img class=\"genreImage d-block w-100\" src=\""+i[4]+"\" alt=\""+i[0]+"\">"+
                                                                        "</div>");
                        }
                        else
                        {
                            $("#actionGenreCrousel").find("ol").append("<li data-target=\"#actionGenreCarousel\" data-slide-to=\""+index+"\"></li>");
                            index = index + 1;
                            $("#actionGenreCrousel").find("#actionGenreCarouselInner").append("<div class=\"carousel-item\">"+
                                                                        "<img class=\"genreImage d-block w-100\" src=\""+i[4]+"\" alt=\""+i[0]+"\">"+
                                                                        "</div>");
                        }
                    });
                },
                error: function(e)
                {
                    console.log("Error: "+e);
                }
            }
        );
    }

    //S2
    function loadAdventureGamesImages()
    {
        $.ajax(
            {
                url: "/loadAdventureGamesImages",
                method: "GET",
                success: function(response)
                {
                    var index = 0;
                    console.log(response);
                    response = JSON.parse(response);
                    response.forEach(i =>
                    {
                        if(index == 0)
                        {
                            $("#adventureGenreCrousel").find("ol").append("<li data-target=\"#adventureGenreCarousel\" data-slide-to=\""+index+"\" class=\"active\"></li>");
                            index = index + 1;
                            $("#adventureGenreCrousel").find("#adventureGenreCarouselInner").append("<div class=\"carousel-item active\">"+
                                                                        "<img class=\"genreImage d-block w-100\" src=\""+i[4]+"\" alt=\""+i[0]+"\">"+
                                                                        "</div>");
                        }
                        else
                        {
                            $("#adventureGenreCrousel").find("ol").append("<li data-target=\"#adventureGenreCarousel\" data-slide-to=\""+index+"\"></li>");
                            index = index + 1;
                            $("#adventureGenreCrousel").find("#adventureGenreCarouselInner").append("<div class=\"carousel-item\">"+
                                                                        "<img class=\"genreImage d-block w-100\" src=\""+i[4]+"\" alt=\""+i[0]+"\">"+
                                                                        "</div>");
                        }
                    });
                },
                error: function(e)
                {
                    console.log("Error: "+e);
                }
            }
        );
    }

    //S2
    function loadRacingGamesImages()
    {
        $.ajax(
            {
                url: "/loadRacingGamesImages",
                method: "GET",
                success: function(response)
                {
                    var index = 0;
                    console.log(response);
                    response = JSON.parse(response);
                    response.forEach(i =>
                    {
                        if(index == 0)
                        {
                            $("#racingGenreCrousel").find("ol").append("<li data-target=\"#racingGenreCarousel\" data-slide-to=\""+index+"\" class=\"active\"></li>");
                            index = index + 1;
                            $("#racingGenreCrousel").find("#racingGenreCarouselInner").append("<div class=\"carousel-item active\">"+
                                                                        "<img class=\"genreImage d-block w-100\" src=\""+i[4]+"\" alt=\""+i[0]+"\">"+
                                                                        "</div>");
                        }
                        else
                        {
                            $("#racingGenreCrousel").find("ol").append("<li data-target=\"#racingGenreCarousel\" data-slide-to=\""+index+"\"></li>");
                            index = index + 1;
                            $("#racingGenreCrousel").find("#racingGenreCarouselInner").append("<div class=\"carousel-item\">"+
                                                                        "<img class=\"genreImage d-block w-100\" src=\""+i[4]+"\" alt=\""+i[0]+"\">"+
                                                                        "</div>");
                        }
                    });
                },
                error: function(e)
                {
                    console.log("Error: "+e);
                }
            }
        );
    }

    //S2
    function loadShootingGamesImages()
    {
        $.ajax(
            {
                url: "/loadShootingGamesImages",
                method: "GET",
                success: function(response)
                {
                    var index = 0;
                    console.log(response);
                    response = JSON.parse(response);
                    response.forEach(i =>
                    {
                        if(index == 0)
                        {
                            $("#shootingGenreCrousel").find("ol").append("<li data-target=\"#shootingGenreCarousel\" data-slide-to=\""+index+"\" class=\"active\"></li>");
                            index = index + 1;
                            $("#shootingGenreCrousel").find("#shootingGenreCarouselInner").append("<div class=\"carousel-item active\">"+
                                                                        "<img class=\"genreImage d-block w-100\" src=\""+i[4]+"\" alt=\""+i[0]+"\">"+
                                                                        "</div>");
                        }
                        else
                        {
                            $("#shootingGenreCrousel").find("ol").append("<li data-target=\"#shootingGenreCarousel\" data-slide-to=\""+index+"\"></li>");
                            index = index + 1;
                            $("#shootingGenreCrousel").find("#shootingGenreCarouselInner").append("<div class=\"carousel-item\">"+
                                                                        "<img class=\"genreImage d-block w-100\" src=\""+i[4]+"\" alt=\""+i[0]+"\">"+
                                                                        "</div>");
                        }
                    });
                },
                error: function(e)
                {
                    console.log("Error: "+e);
                }
            }
        );
    }

    //S2
    function loadRPGGamesImages()
    {
        $.ajax(
            {
                url: "/loadRPGGamesImages",
                method: "GET",
                success: function(response)
                {
                    var index = 0;
                    console.log(response);
                    response = JSON.parse(response);
                    response.forEach(i =>
                    {
                        if(index == 0)
                        {
                            $("#rpgGenreCrousel").find("ol").append("<li data-target=\"#rpgGenreCarousel\" data-slide-to=\""+index+"\" class=\"active\"></li>");
                            index = index + 1;
                            $("#rpgGenreCrousel").find("#rpgGenreCarouselInner").append("<div class=\"carousel-item active\">"+
                                                                        "<img class=\"genreImage d-block w-100\" src=\""+i[4]+"\" alt=\""+i[0]+"\">"+
                                                                        "</div>");
                        }
                        else
                        {
                            $("#rpgGenreCrousel").find("ol").append("<li data-target=\"#rpgGenreCarousel\" data-slide-to=\""+index+"\"></li>");
                            index = index + 1;
                            $("#rpgGenreCrousel").find("#rpgGenreCarouselInner").append("<div class=\"carousel-item\">"+
                                                                        "<img class=\"genreImage d-block w-100\" src=\""+i[4]+"\" alt=\""+i[0]+"\">"+
                                                                        "</div>");
                        }
                    });
                },
                error: function(e)
                {
                    console.log("Error: "+e);
                }
            }
        );
    }

    loadFeaturedGamesImages();
    
    //S2
    loadActionGamesImages();
    //S2
    loadAdventureGamesImages();
    //S2
    loadRacingGamesImages();
    //S2
    loadShootingGamesImages();
    //S2
    loadRPGGamesImages();

    $("#featuredGames").on("click", ".carousel-caption", function(e)
    {
        e.preventDefault();
        let gameId = $(this).siblings("img").attr("alt");
        console.log("Clicked on "+gameId);
        window.location.href = "/showDetails?gameId="+gameId;
    });

    //S2
    $("#actionGenreCrousel").on("click", ".genreImage", function(e)
    {
        e.preventDefault();
        let gameId = $(this).attr("alt");
        console.log("Clicked on "+gameId);
        window.location.href = "/showDetails?gameId="+gameId;
    });
    //S2
    $("#adventureGenreCrousel").on("click", ".genreImage", function(e)
    {
        e.preventDefault();
        let gameId = $(this).attr("alt");
        console.log("Clicked on "+gameId);
        window.location.href = "/showDetails?gameId="+gameId;
    });
    //S2
    $("#racingGenreCrousel").on("click", ".genreImage", function(e)
    {
        e.preventDefault();
        let gameId = $(this).attr("alt");
        console.log("Clicked on "+gameId);
        window.location.href = "/showDetails?gameId="+gameId;
    });
    //S2
    $("#shootingGenreCrousel").on("click", ".genreImage", function(e)
    {
        e.preventDefault();
        let gameId = $(this).attr("alt");
        console.log("Clicked on "+gameId);
        window.location.href = "/showDetails?gameId="+gameId;
    });
    //S2
    $("#rpgGenreCrousel").on("click", ".genreImage", function(e)
    {
        e.preventDefault();
        let gameId = $(this).attr("alt");
        console.log("Clicked on "+gameId);
        window.location.href = "/showDetails?gameId="+gameId;
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