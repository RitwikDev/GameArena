$(document).ready(function()
{
    function loadFeaturedGamesImages()
    {
        $.ajax(
            {
                url: "/loadFeaturedGamesImages",
                method: "GET",
                success: function(response)
                {
                    response = JSON.parse(response);
                    response.forEach(i =>
                        {
                            // <div class="swiper-slide"><img src="../images/1.jpg" style="width: 350px; height: 300px;"></div>
                            $("#featuredGames").append("<div class=\"swiper-slide\">"+
                                                            "<img class=\"featuredGameImage\" src=\""+i[1]+"\">"+
                                                        "</div>")
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

    loadFeaturedGamesImages();
});