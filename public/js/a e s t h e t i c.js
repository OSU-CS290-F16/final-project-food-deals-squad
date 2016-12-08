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
        setTimeout(function() { clearForm(); addDealModal.removeClass("visible"); }, 750);
    });

});

$(function checkboxAction() {
    var checkbox =  $(".checkbox"), valueCheckbox = $("#free-checkbox"), checked = $("#free-checkbox").prop('checked');
    var clickableCheckbox = $(".clickable-checkbox"), visualCheckbox = $(".visual-checkbox");
    var checkmarkPlace = $("p", clickableCheckbox);
    var checkmark = "&#x2714;";

    clickableCheckbox.on("click", function(event) {
        event.stopPropagation();
        if(!checked) {
            visualCheckbox.removeClass("unchecked"); visualCheckbox.addClass("checked");
            $("#free-checkbox").prop("checked", !$("#free-checkbox").is(":checked"));
            checkmarkPlace.html(checkmark);
        } else {
            visualCheckbox.removeClass("checked"); visualCheckbox.addClass("unchecked");
            $("#free-checkbox").prop("checked", !$("#free-checkbox").is(":checked"));
            checkmarkPlace.html("");
        }

        checked = $("#free-checkbox").is(":checked");
    });

});

$(function pushEvent() {
    var commitButton = $(".commit-deal-button");

    commitButton.on("click", function(event){
        event.stopPropagation();

        var eventName = $("#event-name").val(), location = $("#location").val(),
        endTime = $("#time-ending").val(), description = $("#description").val(),
        free = $("#free-checkbox").prop('checked');

        var date = new Date(), hour = date.getHours(), minutes = date.getMinutes();
        var startTime = hour + ":" + minutes;

        if(eventName == "" || location == "" || endTime == "" || description == "") {
            alert("All text fields must be completed!");
        } else {
            $.ajax({
                url: "/add-event",
                type: "POST",
                data: {
                    eventName: eventName,
                    location: location,
                    startTime: startTime,
                    endTime: endTime,
                    description: description,
                    free: free
                },
            })
            .done(function(response) {
                console.log("New event template was recieved!");
                appendNewEvent(response);
				runCheckEndTime();
            })
            .fail(function(err) {
                console.log("Events data could not be sent! ERROR:", err.responseText);
            });

            $(".overlay").click();
        }

        return false;
    });
});


$(function checkEndTime() {
	runCheckEndTime();
});

function runCheckEndTime() {
	var date = new Date();
	$('.endTimeClass').each(function createCountDown() {	
		if ( $(this).attr("timed") != "1" ) {
			$(this).attr("timed", "1");
			var countDown = (Date.parse($(this).attr("value")) - date.getTime());
			var outsideIntervalThis = $(this);
			var timer = setInterval(function(){
				countDown = countDown - 1000;
				outsideIntervalThis.html(calculateTimeAndPrint(countDown));			
				if (countDown <= 0){
					$.ajax({
						url: "/remove-event",
						type: "POST",
						data: {
							eventName: outsideIntervalThis.parent().parent().children("h2").html()
						}
					});
					outsideIntervalThis.parent().parent().remove();
					clearInterval(timer);
				}
			}, 1000);
		}
	});
}

function calculateTimeAndPrint(countDown){
	var days, hours, minutes, seconds;
	days = countDown / 86400000
		hours = days % 1;
	days = days - hours;
	//hours = countDown / 3600000;
	hours = hours * 24;
		minutes = hours % 1;
	hours = hours - minutes;
		minutes = minutes * 60;
			seconds = minutes % 1;
		minutes = minutes - seconds;
			seconds = seconds * 60; 
			seconds = seconds - (seconds % 1);
	var printTime = days + ":" + hours + ":" + minutes + ":" + seconds;
	return printTime;
}


function appendNewEvent(response) {
    var eventsHolder = $(".events-holder");
    eventsHolder.prepend(response);
    $(".event-card:first-child").removeClass("shown");
    setTimeout(function() { $(".event-card:first-child").addClass("shown"); }, 10);
}

function clearForm() {
    var eventName = $("#event-name").val(""), location = $("#location").val(""),
    endTime = $("#time-ending").val(""), description = $("#description").val("");

    if($("#free-checkbox").prop('checked')) {
        $(".visual-checkbox").removeClass("checked"); $(".visual-checkbox").addClass("unchecked");
        $("#free-checkbox").prop("checked", false);
        $("p", ".clickable-checkbox").html("");
    }
}

$(function likeButtonAction() {
    var likeButton = $(".like-button");

    likeButton.on("click", function(event) {
        event.preventDefault();
        var likeButtonPath = $("path", $(this)); likeButtonValue = $(this).attr("value");

        if(likeButtonValue == 0) {
            $(this).addClass("liked"); likeButtonPath.addClass("liked");
            $(this).attr("value", "1");
        } else {
            $(this).removeClass("liked"); likeButtonPath.removeClass("liked");
            $(this).attr("value", "0");
        }
    });
});
