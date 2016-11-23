$(document).click(function(e) {
    var html = $("html"), body = $("body"), overlay = $(".overlay");
    var addDealButton = $("#add-deal-button"), addDealModal = $(".add-deal-modal");

    $(function checkboxAction() {
        var checkbox =  $("#free-checkbox"), checked = document.getElementById("free-checkbox").checked;
        var clickableCheckbox = $(".clickable-checkbox"), visualCheckbox = $(".visual-checkbox");
        var checkmarkPlace = $("p", visualCheckbox);
        var checkmark = "&#x2714;";

        if(checkbox.is(e.target) && checked) {
            clickableCheckbox.removeClass("unchecked"); clickableCheckbox.addClass("checked");
            checkmarkPlace.html(checkmark);
        } else if(checkbox.is(e.target) && !checked) {
            clickableCheckbox.removeClass("checked"); clickableCheckbox.addClass("unchecked");
            checkmarkPlace.html("");
        }
    });

    $(function modalAction() {
        if(overlay.is(e.target)) {
            html.css("overflow-y", ""); body.removeClass("open");
            overlay.removeClass("visible");
            setTimeout(function() { addDealModal.removeClass("visible"); }, 1000);
        }
    });


});

$(function addDeal() {
    var html = $("html"), body = $("body"), overlay = $(".overlay");
    var addDealButton = $("#add-deal-button"), addDealModal = $(".add-deal-modal");

    $(document).on("click", "#add-deal-button", function() {
        html.css("overflow-y", "hidden"); body.addClass("open");
        addDealModal.addClass("visible"); overlay.addClass("visible");
    });

});

function clearForm() {

}
