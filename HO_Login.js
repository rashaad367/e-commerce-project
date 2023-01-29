"use strict"
$(document).ready( ()=> {
    // handler for bxSlider
    $("#slider").bxSlider({
        auto: true,
        autoControls: true,
        captions: true,
        minSlides: 1,
        maxSlides: 1,
        slideHeight: 200,
        slideWidth: 300,
        time: 5000,
        hideControlOnEnd: true
    });

    // handler for email focus
    $("#acct-email-text").focus();

    // complexify password
    $("#progressbar").progressbar({value:0});

    $("#acct-password-text").complexify({},function(valid,complexity) {
        $("#per").text(Math.round(complexity));
        $("#progressbar").progressbar({
            value: complexity
        });
    });



    // handler for the click event of submit button
    $(".login-form").submit(event => {
        let isValid = true;

        // email entry validation
        const ePattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
        const email = $("#acct-email-text").value().trim();

        if (email == "") {
            $("#acct-email-text").next().text("This field is required.");
            isValid = false;
        } else if (!ePattern.test(email)) {
            $("#acct-email-text").next().text("Your email address is not valid.");
            isValid = false;
        } else {
            $("#acct-email-text").next().text("");
        }
        $("#acct-email-text").val(email);

        // password entry validation
        const password = $("#acct-password-text").val().trim();
        const pPattern = /^[a-zA-Z0-9\d=!\-@._*]*$/;
        if (password.length < 7) {
            $("#acct-password-text").next().text("Must more than 6 characters.");
            isValid = false;
        } else if (!pPattern.test(password) || !/[a-z]/.test(password) 
                    || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) { /* Finish this -- Make it work appropriately */
            $("#acct-password-text").next().text("Password must contain at least one lower case, a capital letter, and number.");
            isValid = false;
        } else {
            $("#acct-password-text").next().text("");
        }
        $("#acct-password-text").val(password);

        if (isValid == false) {
            event.preventDefault();
        }
    });

    $("#login-btn").click(function() {
        var title = $(this).attr("title");
        $.ajax({
            type: "get",
            url: "json-files/" + title + ".json",
            error: function(xhr, status, error) {
                alert("Error: " + xhr.status + " - " + error);
            },
            dataType: "json",
            success: function(data) {
                $(".login-status").html(""); // clears html
                setTimeout(function() { // shows failed login status after 2.5 seconds
                    $(".login-status").append(`<h4>${data.status[0].fail}</h4>`);
                    $("#acct-display span").css("top", "-22.75rem");
                    $(".acct-picture").css("top","-14.45rem"); // keeps acct details aligned on screen
                    $(".acct-benefits-list").css("top","-13.75rem");
                    $(".acct-options-images").css("top","-34.75rem");
                }, 2500)
                
            }  
        });
    });
});
