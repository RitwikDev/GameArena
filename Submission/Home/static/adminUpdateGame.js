var gameName = true, price = true, description = true, genreSelected = true, imagesSelected = false, coverImageSelected = false, imagesUploaded = false, coverImageUploaded = false;

$(document).ready(function()
{
    getGenres();
    getOldData();
    enableOrDisableButtons();

    $("#uploadImagesButton").click(function(e)
    {
        e.preventDefault();
        let images = document.getElementById("images");
        let imagesList = "";
        let imagesFilesLength = images.files.length;
        
        for(let i=0; i<imagesFilesLength; i=i+1)
        {
            let src = "../static/images/"+images.files[i].name;
            imagesList = imagesList + src + ",";
        }
        imagesList = imagesList.substring(0, imagesList.length-1);
        console.log(imagesList);
        $("#imagesListHidden").val(imagesList);

        if(imagesFilesLength < 2)
            $("#imagesUploadIndicator").html("<p class=\"text-success\">"+imagesFilesLength+" image received.</p>");
        else
            $("#imagesUploadIndicator").html("<p class=\"text-success\">"+imagesFilesLength+" images received.</p>");

        imagesUploaded = true;
        enableOrDisableButtons();
    });

    $("#uploadCoverImageButton").click(function(e)
    {
        e.preventDefault();
        let image = document.getElementById("coverImage");
        let src = "../static/images/"+image.files[0].name;
        $("#coverImageListHidden").val(src);
        $("#coverImageUploadIndicator").html("<p class=\"text-success\">Cover image received.</p>");
        coverImageUploaded = true;
        enableOrDisableButtons();
    });

    $("#gameSubmitButton").click(function(e)
    {
        e.preventDefault();
        let genre = $("#genre").val();
        console.log(genre);
        let genreList = "";
        for(let i=0; i<genre.length; i=i+1)
            genreList = genreList + genre[i] +",";
        
        genreList = genreList.substring(0, genreList.length-1);
        $("#genreHidden").val(genreList);

        $.ajax(
        {
            url: "/updateGame",
            type: "POST",
            data: $("#gameForm").serialize(),
            success: function(response)
            {
                let responseJSON = JSON.parse(response);
                if(responseJSON.message == "Successful")
                    window.location.href = "/adminIndex";
            },
            error: function(error)
            {
                console.log(error);
            }
        });
    });

    $("#featured").change(function() 
    {  
        if (this.checked) 
        {
            $("#hiddenFeatured").val("1");
        }
        else
        {
            $("#hiddenFeatured").val("0");
        }
    });
});

function getGenres()
{
    $.ajax(
    {
        url: "/getGenres",
        success: function(response)
        {
            let responseJSON = JSON.parse(response);
            if(responseJSON.length > 0)
            {
                for(let i=0; i<responseJSON.length; i=i+1)
                    $("#genre").append("<option id=\""+responseJSON[i]+"\" value=\""+responseJSON[i]+"\">"+responseJSON[i]+"</option>");   
            }
        },
        error: function(error)
        {
            console.log(error);
        }
    });
}

function getOldData()
{
    let gameId = document.getElementById("gameId").value;
    $.ajax(
    {
        url: "/getGameDetails",
        type: "POST",
        data: gameId,
        success: function(response)
        {
            response = JSON.parse(response).response;
            console.log(response);
            let oldName = response[0][1];
            let oldDescription = response[0][2];
            let oldPrice = response[0][3];
            let oldGenres = [];
            let oldFeatured = response[0][10];

            console.log("of = "+oldFeatured);
            if(oldFeatured == null || oldFeatured == 0 || oldFeatured == "0")
                $("#featured").prop("checked", false);
            else
                $("#featured").prop("checked", true);

            for(let i=0; i<response.length; i=i+1)
                oldGenres.push(response[i][8]);
            
            $("#name").val(oldName);
            $("#price").val(oldPrice);
            $("#description").val(oldDescription);

            for(let i=0; i<oldGenres.length; i=i+1)
                $("#"+oldGenres[i]).attr("selected", true);
        },
        error: function(error)
        {
            console.log(error);
        }
    });
}

function nameChanged(value)
{
    console.log("nameChange = "+value);
    if(value.length > 50 || value.length <= 0)
    {
        $("#nameError").html("Game\'s name must be between 1 and 50 characters.");
        $("#name").addClass("is-invalid");
        gameName = false;
    }
    else
    {
        $("#nameError").html("");
        $("#name").removeClass("is-invalid");
        gameName = true;
    }
    enableOrDisableButtons();
}

function priceChanged(value)
{
    console.log("priceChange = "+value);
    if(value == "" || value < 0)
    {
        $("#priceError").html("Enter a valid amount.");
        $("#price").addClass("is-invalid");
        price = false;
    }
    else
    {
        $("#priceError").html("");
        $("#price").removeClass("is-invalid");
        price = true;
    }
    enableOrDisableButtons();
}

function descriptionChanged(value)
{
    console.log("descriptionChange = "+value);
    if(value.length > 500 || value.length <= 0)
    {
        $("#descriptionError").html("Game\'s description must be between 1 and 500 characters.");
        $("#description").addClass("is-invalid");
        description = false;
    }
    else
    {
        $("#descriptionError").html("");
        $("#description").removeClass("is-invalid");
        description = true;
    }
    enableOrDisableButtons();
}

function genreChanged(value)
{
    console.log("genreChange = "+value);
    if(value == null || value.length == 0 || value == "")
    {
        $("#genreError").html("Select at-least one genre.");
        $("#genre").addClass("is-invalid");
        genreSelected = false;
    }
    else
    {
        $("#genreError").html("");
        $("#genre").removeClass("is-invalid");
        genreSelected = true;
    }
    enableOrDisableButtons();
}

function imagesChanged(value)
{
    console.log("imagesChange = "+value);
    if(value == null || value.length == 0 || value == "")
    {
        // $("#imagesUploadIndicator").html("<p class=\"text-danger\">At-least one image must be uploaded</p>");
        // $("#imagesUploadIndicator").html("");
        imagesSelected = false;
    }
    else
    {
        // $("#imagesUploadIndicator").html("");
        imagesSelected = true;
    }
    enableOrDisableButtons();
}

function coverImageChanged(value)
{
    console.log("coverImageChange = "+value);
    if(value == null || value.length == 0 || value == "")
    {
        // $("#coverImageUploadIndicator").html("<p class=\"text-danger\">Cover image must be uploaded</p>");
        // $("#coverImageUploadIndicator").html("");
        coverImageSelected = false;
    }
    else
    {
        // $("#coverImageUploadIndicator").html("");
        coverImageSelected = true;
    }
    enableOrDisableButtons();
}


function enableOrDisableButtons()
{
    if(imagesSelected)
        $("#uploadImagesButton").removeAttr("disabled");
    else
        $("#uploadImagesButton").attr("disabled", "disabled");

    if(coverImageSelected)
        $("#uploadCoverImageButton").removeAttr("disabled");
    else
        $("#uploadCoverImageButton").attr("disabled", "disabled");

    if(gameName && price && description && genreSelected)
        $("#gameSubmitButton").removeAttr("disabled");
    
    else
        $("#gameSubmitButton").attr("disabled", "disabled");
}