$(document).ready(function()
{
    enableDisableButton();
});

function enableDisableButton()
{
    let searchTerm = document.getElementById("searchField").value;
    let button = document.getElementById("searchButton");
    
    if(searchTerm == null || searchTerm.trim().length == 0)
        button.disabled = true;
    else
        button.disabled = false;
}

function searchTermChanged()
{
    enableDisableButton();
}