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
    var checkbox =  $(".checkbox"), valueChecked = $("#free-checkbox").is(":checked");
    var visualCheckbox = $(".visual-checkbox"), clickableCheckbox = $(".clickable-checkbox");
    var checkmarkPlace = $("p", clickableCheckbox);
    var checkmark = "&#x2714;";

    clickableCheckbox.on("click", function(event) {
        event.stopPropagation();
        if(!valueChecked) {
            visualCheckbox.removeClass("unchecked"); visualCheckbox.addClass("checked");
            $("#free-checkbox").prop("checked", !$("#free-checkbox").is(":checked"));
            checkmarkPlace.html(checkmark);
        } else {
            visualCheckbox.removeClass("checked"); visualCheckbox.addClass("unchecked");
            $("#free-checkbox").prop("checked", !$("#free-checkbox").is(":checked"));
            checkmarkPlace.html("");
        }

        valueChecked = $("#free-checkbox").is(":checked");
    });

});

$(function pullInfomationg() {
    var commitButton = $(".commit-deal-button");

    commitButton.on("click", function(event){
        event.stopPropagation();

        var eventName = document.getElementById("event-name").value, location = document.getElementById("location").value,
        endTime = document.getElementById("time-ending").value, description = document.getElementById("description").value,
        free = document.getElementById("free-checkbox").checked;

        console.log(eventName, location, endTime, description,  free);
    });
});

function clearForm() {

}
