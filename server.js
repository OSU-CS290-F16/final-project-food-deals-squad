var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var jsonfile = require('jsonfile');
jsonfile.spaces = 4

var handlebars = require('handlebars');

// Use handlebars to parse geolocation (replace spaces with +). if no geolocation
// return a valid address of Valley Library (else has no current functionality
// because there is a check in modal for empty geolocation string)
handlebars.registerHelper('formatGeolocation', function(geolocation, options){
  if(geolocation)
  {  geolocation= geolocation.replace(/\s+/g, '+');
     return geolocation;
  }
  else
  {  return("201+SW+Waldo+Pl,+Corvallis,+OR");
  }
});

// Use Handlebars as the view engine for the app.
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars');


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(request, response) {
    console.log("== Got request for:", request.url, "\n");

    jsonfile.readFile('./events.json', function(error, events){
        response.render('index-page', {
            title: 'Food Deal Squad',
            eventObjects: events
        });
    });


});

app.post('/add-event', function(request, response) {
    console.log("== Recieved new event data\n");

    var eventName = request.body.eventName.trim();
    var location = request.body.location;
    var startTime = request.body.startTime;
    var endTime = request.body.endTime;
    var description = request.body.description.trim();
    var free = request.body.free;

    var key = eventName.replace(/\s+/g, '-').toLowerCase();

    var eventObject = {
        "eventName": eventName,
        "description": description,
        "startTime": startTime,
        "endTime": endTime,
        "free": JSON.parse(free),
        "rating": 0,
        "geolocation": location
    };

    jsonfile.readFile("./events.json", function(error, eventsList) {
        eventsList[key] = eventObject;
        jsonfile.writeFile("./events.json", eventsList);
    });

    response.render('./partials/eventObject', {
        layout: false,
        eventName:eventName,
        geolocation: location,
        description: description,
        endTime: endTime,
    }, function(error, renderedEvent) {
        response.status(202).send(renderedEvent);
    });

    console.log("== New event was successfully saved and sent!\n");

});

app.post('/remove-event', function(request, response){
	var eventName = request.body.eventName.trim();
	var key = eventName.replace(/\s+/g, '-').toLowerCase();
	
    jsonfile.readFile("./events.json", function(error, eventsList) {
		console.log(key);
		delete eventsList[key];
        jsonfile.writeFile("./events.json", eventsList);
    });
});

app.post('/uptick-event-rating', function(request, response) {
    console.log("== Recieved liked event data\n");
    response.status(202).send("");

    var likedEvents = request.body.likedEvents;
    likedEvents = JSON.parse(likedEvents);
    likedEvents = likedEvents.events;

    jsonfile.readFile("./events.json", function(error, eventsList) {

        for(var e = 0; e < likedEvents.length; e++) {
            var key = likedEvents[e].replace(/\s+/g, '-').toLowerCase();
            eventsList[key]["rating"] = ( parseInt(eventsList[key]["rating"]) + 1 );
        }

        jsonfile.writeFile("./events.json", eventsList);

    });

});


app.post('/remove-event', function(request, response){
	var eventName = request.body.eventName.trim();
	var key = eventName.replace(/\s+/g, '-').toLowerCase();

    jsonfile.readFile("./events.json", function(error, eventsList) {
		console.log(key);
		delete eventsList[key];
        jsonfile.writeFile("./events.json", eventsList);
    });
});


app.post('/uptick-event-rating', function(request, response) {
    console.log("== Recieved liked event data\n");
    response.status(202).send("");

    var likedEvents = request.body.likedEvents;
    likedEvents = JSON.parse(likedEvents);
    likedEvents = likedEvents.events;

    jsonfile.readFile("./events.json", function(error, eventsList) {

        for(var e = 0; e < likedEvents.length; e++) {
            var key = likedEvents[e].replace(/\s+/g, '-').toLowerCase();
            eventsList[key]["rating"] = ( parseInt(eventsList[key]["rating"]) + 1 );
        }

        jsonfile.writeFile("./events.json", eventsList);

    });

});

app.get('*', function(request, response) {
    response.status(404).render('404-page', {
        title: 'Food Deals Squad'
    });
    console.log("== File Not Found | Status Code", response.statusCode, "\n");
});

// Listen on the specified port.
app.listen(port, function() {
    console.log("== Listening on port", port, "\n");
});
