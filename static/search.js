var data, price, rating=1;
$(document).ready(function()
{
    var searchTerm = document.getElementById("searchField").value;
    $.ajax(
    {
        url: "/search",
        type: "POST",
        data: searchTerm,
        success: function(response)
        {
            data = JSON.parse(response)
            displayResults();
        },
        error: function(error)
        {
            console.log(error);
        }
    });

    $("#searchResults").on("click", "a", function(e)
    {
        let gameId = $(this).siblings(".gameId").val();
        $(this).attr("href", "/showDetails?gameId="+gameId);
    });
});

function displayResults()
{
    if(data.length == 0)
    {
        let display = "<div class=\"jumbotron jumbotron-fluid\" id=\"nothingFound\">"+
                            "<div class=\"container\">"+
                                "<h1 class=\"display-4 text-center\">No games found...</h1>"+
                                "<p class=\"lead text-center\">Try using a different keyword.</p>"+
                            "</div>"+
                        "</div>";
        $("#nothingFound").remove();
        $("body").append(display);
    }

    else
    {
        displayFilters();
        for(let i=0; i<data.length; i=i+1)
        {
            let card = "<div class=\"card\" style=\"width: 18rem; margin: 2%\">"+
                            "<img class=\"card-img-top\" src=\""+data[i][6]+"\" alt=\""+data[i][7]+"\">"+
                            "<div class=\"card-body\">"+
                                "<h5 class=\"card-title\">"+data[i][1]+"</h5>"+
                                "<p class=\"card-text\">"+data[i][2].substring(0, 70)+"...</p>"+
                            "</div>"+
                            "<div class=\"card-footer text-center\">"+
                                "<input type=\"hidden\" class=\"gameId\" value=\""+data[i][0]+"\">"+
                                "<a href=\"#\" class=\"btn btn-link\">See details</a>"+
                            "</div>"+
                        "</div>";

            $("#searchResults").append(card);
        }
    }
}

function displayFilters()
{
    //Price
    let minPrice = 99999999, maxPrice = -1;
    for(let i=0; i<data.length; i=i+1)
    {
        if(data[i][3] > maxPrice)
            maxPrice = data[i][3];
        
        if(data[i][3] < minPrice)
            minPrice = data[i][3];
    }
    price = maxPrice;

    let listGroup = "<ul id=\"listGroup\" class=\"list-group list-group-flush\" style=\"margin-top: 2%; margin-right: 2%\">"+
                        "<li class=\"list-group-item\">"+
                            "<label for=\"priceRange\" class=\"form-label\">Price</label><br />"+
                            "<input type=\"range\" class=\"form-range\" min=\""+minPrice+"\" max=\""+maxPrice+"\" id=\"priceRange\" value=\""+maxPrice+"\" onchange=\"priceRangeChanged(this.value)\" style=\"width: 100%;\"><br />"+
                            "<input type=\"number\" class=\"form-control\" id=\"priceTextbox\" value=\""+maxPrice+"\" onchange=\"priceTextboxChanged(this.value)\">"+
                        "</li>"+
                    "</ul>";
    $("#filters").append(listGroup);

    //Rating
    let rating = "<li class=\"list-group-item\">"+
                    "<label>User Ratings</label>"+
                    "<div class=\"form-check\">"+
                        "<input class=\"form-check-input\" type=\"radio\" name=\"ratingsRadio\" value=\"4\" id=\"fourAndUp\" onclick=\"ratingsChanged(this.value)\">"+
                        "<label class=\"form-check-label\" for=\"fourAndUp\">"+
                        "4 stars and up"+
                        "</label>"+
                    "</div>"+
                    "<div class=\"form-check\">"+
                        "<input class=\"form-check-input\" type=\"radio\" name=\"ratingsRadio\" value=\"3\" id=\"threeAndUp\" onclick=\"ratingsChanged(this.value)\">"+
                        "<label class=\"form-check-label\" for=\"threeAndUp\">"+
                        "3 stars and up"+
                        "</label>"+
                    "</div>"+
                    "<div class=\"form-check\">"+
                        "<input class=\"form-check-input\" type=\"radio\" name=\"ratingsRadio\" value=\"2\" id=\"twoAndUp\" onclick=\"ratingsChanged(this.value)\">"+
                        "<label class=\"form-check-label\" for=\"twoAndUp\">"+
                        "2 stars and up"+
                        "</label>"+
                    "</div>"+
                    "<div class=\"form-check\">"+
                        "<input class=\"form-check-input\" type=\"radio\" name=\"ratingsRadio\" value=\"1\" id=\"oneAndUp\" onclick=\"ratingsChanged(this.value)\" checked>"+
                        "<label class=\"form-check-label\" for=\"oneAndUp\">"+
                        "1 star and up"+
                        "</label>"+
                    "</div>"+
                "</li>";
    $("#listGroup").append(rating);
}

function displayFilteredResults()
{
    $("#searchResults").empty();
    for(let i=0; i<data.length; i=i+1)
    {
        if(data[i][3] <= price && data[i][4] >= rating)
        {
            let card = "<div class=\"card\" style=\"width: 18rem; margin: 2%\">"+
                            "<img class=\"card-img-top\" src=\""+data[i][6]+"\" alt=\""+data[i][7]+"\">"+
                            "<div class=\"card-body\">"+
                                "<h5 class=\"card-title\">"+data[i][1]+"</h5>"+
                                "<p class=\"card-text\">"+data[i][2].substring(0, 70)+"...</p>"+
                            "</div>"+
                            "<div class=\"card-footer text-center\">"+
                                "<input type=\"hidden\" class=\"gameId\" value=\""+data[i][0]+"\">"+
                                "<a href=\"#\" class=\"btn btn-link\">See details</a>"+
                            "</div>"+
                        "</div>";

            $("#searchResults").append(card);
        }
    }
}

function priceRangeChanged(value)
{
    $("#priceTextbox").val(value);
    price = value;
    displayFilteredResults();
}

function priceTextboxChanged(value)
{
    $("#priceRange").val(value);
    price = value;
    displayFilteredResults();
}

function ratingsChanged(value)
{
    rating = value;
    console.log("rating: "+rating);
    displayFilteredResults();
}