document.addEventListener("touchstart", function(){}, true);
$(document).ready(function(){ 
    var currPage = $("#results").text();
    var hasResults = function(){
        if( currPage === "") {
            console.log("Page is empty")
            return false;
        } else {
            console.log("Page has content");
            return true;
        }
    };
    $("#user-query-field").click(function(){
        $(this).attr("value","");  
        $(this).val("");  
    });
    
    var searchAndDisplay = function(){
        var userQuery = $("#user-query-field").val();
        var jsonUrl= "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=" + userQuery;
            $.getJSON(jsonUrl, function(data) {

                console.log(data);
                for(i=0; i < data[1].length; i++) {

                //print the result title    
                console.log(data[1][i]);
                $("#results").append("<article class='result'><h3>" + data[1][i] + "</h3><p>" + data[2][i] + "</p><p><a href='" + data[3][i] + "'></a></p></article>" )
        
                }
            }, "json"); 
    }

    $("button#search-button").click(function(){
        
        if(hasResults){
            $("#results").html("");
            searchAndDisplay();
        } else {
            searchAndDisplay();
        }
        
    }); // end buttun search on click
     
    
}); //end main function
