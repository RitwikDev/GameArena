var gameName = false, price = false, description = false, genreSelected = false, imagesSelected = false, coverImageSelected = false, imagesUploaded = false, coverImageUploaded = false;

$(document).ready(function()
{
    getGenres();

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
            url: "/addNewGame",
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
                    $("#genre").append("<option value=\""+responseJSON[i]+"\">"+responseJSON[i]+"</option>");   
            }
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
    $("#newGameName").html(value);
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
        $("#imagesUploadIndicator").html("<p class=\"text-danger\">At-least one image must be uploaded</p>")
        imagesSelected = false;
    }
    else
    {
        $("#imagesUploadIndicator").html("")
        imagesSelected = true;
    }
    enableOrDisableButtons();
}

function coverImageChanged(value)
{
    console.log("coverImageChange = "+value);
    if(value == null || value.length == 0 || value == "")
    {
        $("#coverImageUploadIndicator").html("<p class=\"text-danger\">Cover image must be uploaded</p>")
        coverImageSelected = false;
    }
    else
    {
        $("#coverImageUploadIndicator").html("")
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

    if(gameName && price && description && genreSelected && imagesSelected && coverImageSelected && imagesUploaded && coverImageUploaded)
        $("#gameSubmitButton").removeAttr("disabled");
    
    else
        $("#gameSubmitButton").attr("disabled", "disabled");
}