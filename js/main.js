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
    
    var searchAndDisplay = function(){
        var userQuery = $("#userQueryForm").val();
        var jsonUrl= "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=" + userQuery;
            $.getJSON(jsonUrl, function(data) {

                console.log(data);
                for(i=0; i < data[1].length; i++) {

                //print the result title    
                console.log(data[1][i]);
                $("#results").append("<div class='result'><h3>" + data[1][i] + "</h3>")
                //print the summary
                console.log(data[2][i]);
                $("#results").append("<p>" + data[2][i] + "</p>")
                //print the url   
                console.log(data[3][i]);
                $("#results").append("<p><a href=" + data[3][i] + ">View on Wikipedia</a><p></div>")

                }
            }, "json"); 
    }

    $("button#searchButton").click(function(){
        
        if(hasResults){
            $("#results").html("");
            searchAndDisplay();
        } else {
            searchAndDisplay();
        }
        
    }); // end buttun search on click
     
    
}); //end main function
