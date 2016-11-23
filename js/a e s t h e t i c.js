$(function addDealModalAction() {
    var html = $("html"), body = $("body"), overlay = $(".overlay");
    var addDealButton = $("#add-deal-button"), addDealModal = $(".add-deal-modal");

    addDealButton.on("click", function(event) {
        event.stopPropagation();
        html.css("overflow-y", "hidden"); body.addClass("open");
        addDealModal.addClass("visible"); overlay.addClass("visible");
    });

    overlay.on("click",function(event) {
        event.stopPropagation();
        html.css("overflow-y", ""); body.removeClass("open");
        overlay.removeClass("visible");
        setTimeout(function() { addDealModal.removeClass("visible"); }, 1000);
    });

});

$(function checkboxAction() {
    var checkbox =  $(".checkbox"), checked = document.getElementById("free-checkbox").checked;
    var clickableCheckbox = $(".clickable-checkbox"), visualCheckbox = $(".visual-checkbox");
    var checkmarkPlace = $("p", visualCheckbox);
    var checkmark = "&#x2714;";

    checkbox.delegate("label", "click", function(event) {
        event.stopImmediatePropagation();
    }).on("click", function(event) {
        if(!checked) {
            clickableCheckbox.removeClass("unchecked"); clickableCheckbox.addClass("checked");
            checked = true; checkmarkPlace.html(checkmark);
        } else {
            clickableCheckbox.removeClass("checked"); clickableCheckbox.addClass("unchecked");
            checked = false; checkmarkPlace.html("");
        }

        console.log(checked);

    });

});

function clearForm() {

}
