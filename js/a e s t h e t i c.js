$(document).click(function(e) {
    var html = $("html"), body = $("body"), overlay = $(".overlay");
    var addDealButton = $("#add-deal-button"), addDealModal = $(".add-deal-modal");

    if(overlay.is(e.target)) {
        html.css("overflow-y", "");
        body.css("position", "").css("right", "");
        addDealModal.addClass("hidden"); overlay.addClass("hidden");
    }

});

$(function addDeal(){
    var html = $("html"), body = $("body"), overlay = $(".overlay");
    var addDealButton = $("#add-deal-button"), addDealModal = $(".add-deal-modal");

    $(document).on("click", "#add-deal-button", function() {
        html.css("overflow-y", "hidden");
        body.css("position", "relative").css("right", "600px");
        addDealModal.removeClass("hidden"); overlay.removeClass("hidden");
    });

});
