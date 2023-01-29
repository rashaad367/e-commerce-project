$(document).ready(function() {
    $("#examples").click(function() {
        var title = $(this).attr("title");
        $.ajax({
            type: "get",
            url: "json-files/" + title + ".json",
            error: function(xhr, status, error) {
                alert("Error: " + xhr.status + " - " + error);
            },
            dataType: "json",
            success: function(data) {
                $(".conversion-tool").html(""); // clears html
                $(".conversion-tool").append("<h3>Conversion is made in mulitples of 10 points for every dollar.</h3><br>");
                $(".conversion-tool").append(`<img src="images/${data.examples[0].exmp1}" alt="Example 1"><br>`);
                $(".conversion-tool").append(`<img src="images/${data.examples[0].exmp2}" alt="Example 2"><br>`);
                $(".donation-cause").css("top","-18.5rem"); // keeps header and images in same spot on the right
            }  
        });
    });
}); // end ready