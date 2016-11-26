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
    var checkbox =  $(".checkbox"), valueCheckbox = $("#free-checkbox"), checked = $("#free-checkbox").prop('checked');
    var clickableCheckbox = $(".clickable-checkbox"), visualCheckbox = $(".visual-checkbox");
    var checkmarkPlace = $("p", visualCheckbox);
    var checkmark = "&#x2714;";

    console.log(checked);

    checkbox.delegate("label", "click", function(event) {
        event.stopImmediatePropagation();
    }).on("click", function(event) {
        if(!checked) {
            console.log("mark");
            clickableCheckbox.removeClass("unchecked"); clickableCheckbox.addClass("checked");
            valueCheckbox.prop('checked', true); checkmarkPlace.html(checkmark);
        } else {
            console.log("unmark");
            clickableCheckbox.removeClass("checked"); clickableCheckbox.addClass("unchecked");
            valueCheckbox.prop('checked', false); checkmarkPlace.html("");
        }

        console.log(valueCheckbox.prop("checked"));

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

$(function likeButtonAction() {
    var likeButton = $(".like-button");
    console.log(likeButton.attr("value"));

    likeButton.on("click", function(event) {
        event.preventDefault();
        var likeButtonPath = $("path", $(this)); likeButtonValue = $(this).attr("value");

        if(likeButtonValue == 0) {
            console.log("liked");
            likeButtonPath.addClass("liked");
            $(this).attr("value", "1");
        } else {
            console.log("unliked");
            likeButtonPath.removeClass("liked");
            $(this).attr("value", "0");
        }
        console.log(likeButton.attr("value"));
    });
});
