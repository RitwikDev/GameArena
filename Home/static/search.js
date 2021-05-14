var data, price, rating=1;
$(document).ready(function()
{
    showNav();
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
        let gameId = $(this).parent().siblings(".gameId").val();
        $(this).attr("href", "/showDetails?gameId="+gameId);
    });

    $("#paginationNav").on("click", "a", function(e)
    {
        e.preventDefault();
        let pageNo = $(this).html();

        for(let i=1; i<=totalPage; i=i+1)
            $("."+i).css("display", "none");
        
        $("."+pageNo).css("display", "block");

        $("#paginationNav").find("li").removeClass("active");
        $(this).parent().addClass("active");
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

function displayResults()
{
    $("#searchTermJumbotron").text($("#searchField").val());
    $("#filters").empty();
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
        displayPagination(data.length);
        displayFilters();
        let pageNo=1, c=0;
        for(let i=0; i<data.length; i=i+1)
        {
            if(c==3)
            {
                c=0;
                pageNo=pageNo+1;
                // $("#searchResults").append("<div id=\""+pageNo+"\" style=\"display: none;\"></div>");
            }
            let card = "<div class=\"col-3 "+pageNo+"\" style=\"display: none;\">"+
                            "<div class=\"card\" style=\"width: 22rem; margin: 2%\">"+
                                "<img class=\"card-img-top\" src=\""+data[i][7]+"\" alt=\""+data[i][8]+"\">"+
                                "<div class=\"card-body\">"+
                                    "<h5 class=\"card-title\">"+data[i][1]+"</h5>"+
                                    "<p class=\"card-text\">"+data[i][2].substring(0, 70)+"...</p>"+
                                "</div>"+
                                "<div class=\"card-footer text-center\">"+
                                    "<input type=\"hidden\" class=\"gameId\" value=\""+data[i][0]+"\">"+
                                    "<div class=\"d-flex justify-content-between\">"+
                                        "<a href=\"#\" class=\"btn btn-link\">See details</a>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>";
                        
            $("#searchResults").append(card);
            c=c+1;
        }
    }
    $(".1").css("display", "block");
}

function displayFilters()
{
    $("#searchResults").append("<div class=\"col-3\" id=\"filters\"></div>");
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
                        "<li class=\"list-group-item active rounded-top text-center\"><h3>Filters</h3></li>"+
                        "<li class=\"list-group-item border border-primary\">"+
                            "<label for=\"priceRange\" class=\"form-label\"><h5>Price</h5></label><br />"+
                            "<input type=\"range\" class=\"form-range\" min=\""+minPrice+"\" max=\""+maxPrice+"\" id=\"priceRange\" value=\""+maxPrice+"\" onchange=\"priceRangeChanged(this.value)\" style=\"width: 100%;\"><br />"+
                            "<input type=\"number\" class=\"form-control\" id=\"priceTextbox\" value=\""+maxPrice+"\" onchange=\"priceTextboxChanged(this.value)\">"+
                        "</li>"+
                    "</ul>";
    $("#filters").append(listGroup);

    //Rating
    let rating = "<li class=\"list-group-item border border-primary rounded-bottom\">"+
                    "<label><h5>User Ratings</h5></label>"+
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
    for(let i=1; i<=totalPage; i=i+1)
        $("#searchResults").find("."+i).remove();

    // displayFilters();

    let pageNo=1, c=0, filteredDataLength=0;
    for(let i=0; i<data.length; i=i+1)
    {
        if(c==3)
        {
            c=0;
            pageNo=pageNo+1;
        }
        if(data[i][3] <= price && data[i][4] >= rating)
        {
            filteredDataLength=filteredDataLength+1;

            let card = "<div class=\"col-3 "+pageNo+"\" style=\"display: none;\">"+
                            "<div class=\"card\" style=\"width: 22rem; margin: 2%\">"+
                                "<img class=\"card-img-top\" src=\""+data[i][7]+"\" alt=\""+data[i][8]+"\">"+
                                "<div class=\"card-body\">"+
                                    "<h5 class=\"card-title\">"+data[i][1]+"</h5>"+
                                    "<p class=\"card-text\">"+data[i][2].substring(0, 70)+"...</p>"+
                                "</div>"+
                                "<div class=\"card-footer text-center\">"+
                                    "<input type=\"hidden\" class=\"gameId\" value=\""+data[i][0]+"\">"+
                                    "<div class=\"d-flex justify-content-between\">"+
                                        "<a href=\"#\" class=\"btn btn-link\">See details</a>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>";

            $("#searchResults").append(card);
            c=c+1;
        }
    }
    displayPagination(filteredDataLength);
    $(".1").css("display", "block");
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

function displayPagination(data)
{
    $("#paginationNav ul").empty();
    let pagination="";
    if(data%3==0)
        totalPage=data/3;
    else
        totalPage=(data/3)+1;
    
    for(let i=1; i<=totalPage; i=i+1)
        pagination = pagination + "<li class=\"page-item\" id=\"pagination"+i+"\"><a class=\"page-link\" href=\"#\">"+i+"</a></li>";
    
    $("#paginationNav ul").append(pagination);
    $("#paginationNav").find("li").removeClass("active");
    $("#pagination1").addClass("active");
}