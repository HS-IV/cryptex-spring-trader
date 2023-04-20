
// JavaScript code for the tutorial page allows buttons to change the text of the button and show/hide the paragraph

$(document).ready(function () {
    $('.toggle-paragraph').hide();
    $(".toggle-btn").on("click", function () {

        let paragraph = $(this).next();
        if (paragraph.css("display") === "none") {
            paragraph.css("display", "block");
            $(this).html("-");

        } else {
            paragraph.css("display", "none");
            $(this).html("+");
        }
    });
});