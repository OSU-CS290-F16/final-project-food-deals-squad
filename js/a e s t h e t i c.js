$(document).click(function(e) {
    console.log("hello");
    var html = $("html"), body = $("body"), overlay = $(".overlay");
    var addDealButton = $("#add-deal-button"), addDealModal = $(".add-deal-modal");

    if(!(addDealButton.is(e.target)) && !(addDealModal.hasClass("hidden"))) {
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
        body.css("position", "absolute").css("right", "600px");
        addDealModal.removeClass("hidden"); overlay.removeClass("hidden");
    });

});
