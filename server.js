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
        "event-name": eventName,
        "description": description,
        "start-time": startTime,
        "end-time": endTime,
        "free": free,
        "rating": "0",
        "geolocation": location
    };

    jsonfile.readFile("./events.json", function(error, eventsList) {
        eventsList[key] = eventObject;
        jsonfile.writeFile("./events.json", eventsList);
    });

    //var eventObject = {[key] : eventObject}
    console.log(eventObject);

    /* eventString = JSON.stringify(eventObject);
    eventString = eventString.replace(/[{}]/g, ''); */
    //console.log(eventString);

    response.render('./partials/eventObject', {layout: false, eventObject:eventObject[key]}, function(error, renderedEvent) {
        console.log(eventObject);
        response.send(renderedEvent);
    });

    console.log("== New event was successfully saved and sent!\n");

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
