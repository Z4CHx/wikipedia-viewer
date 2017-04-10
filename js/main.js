document.addEventListener("touchstart", function(){}, true);
$(document).ready(function(){ 
    
    $("#user-query-field").click(function(){
        $(this).attr("value","");  
        $(this).val("");  
    });
    
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
       
    var showResults = function(){
      
        $("article.result.card").each(function(index){
            $(this).delay(200*index).fadeIn("slow");
        });

    };
     
    var searchAndCreate = function(){
        var userQuery = $("#user-query-field").val();
        var jsonUrl= "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=" + userQuery;
            $.getJSON(jsonUrl, function(data) {
                for(i=0; i < data[1].length; i++) {
                //print the result title    
                console.log(data[1][i]);
                $("#results").append('<article class="card result"><h2>' + data[1][i] + '</h2><p>' + data[2][i] + '</p><p><a href="' + data[3][i] + '" target="_blank">View on Wikipedia</a> <i class="fa fa-external-link" aria-hidden="true"></i></p></article>')
                showResults();
                }
            }, "json"); 
    };
    
    var randomArticle = function(){
        var jsonUrl= "https://cors-anywhere.herokuapp.com/http://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&explaintext&titles=Main%20Page&prop=info&inprop=url&format=json";
            $.getJSON(jsonUrl, function(data) {
                console.log(data);
                //print the random article    
                $("#hello-card").append('<span id="random-article"><a href="' + data.query.pages[Object.keys(data.query.pages)].fullurl + '" target="_blank"><h3>' + data.query.pages[Object.keys(data.query.pages)].title + ' <i class="fa fa-external-link" aria-hidden="true"></h3></a></span>');
                
            }, "json"); 
    };

    $("button#search-button").on('click',function(){
        $(this).addClass("flip animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass("flip");
        });
        if(hasResults){
            $("#results").html("");
            searchAndCreate();
        } else {
            searchAndCreate();
        }
    }); // end button search on click
    
    $(".one-time").click(function(){
        randomArticle();
    });
    
    
     
}); //end main function


//https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json