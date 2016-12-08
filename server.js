var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var handlebars = require('handlebars');

var app = express();
var port = process.env.PORT || 8080;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var jsonfile = require('jsonfile');
jsonfile.spaces = 4


// Use Handlebars as the view engine for the app.
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

handlebars.registerHelper('isEndingSoon', function(endTime, options) {
  var  fnTrue = options.fn, fnFalse = options.inverse;
  var  endDate = new Date(Date.parse(endTime));
  var  currentDate = new Date();

    if((Date.parse(endDate) - Date.parse(currentDate)) < 3600000){
      return fnTrue(this);
    } else{
        return fnFalse(this);
    }
});

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
        "free": free,
        "rating": "0",
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

//Flair for Ending Soon



/* handlebars.registerHelper('ifEndingSoon', function(endTime, options) {
var  fnTrue = options.fn
var  fnFalse = optiond.inverse;
var  endDate = new Date(date.parse(endTime));
var  currentDate = new Date();

  if(Date.parse(currentDate) - Date.parse(endDate) < 3600000){
    return fnTrue(this);
  } else{
      return fnFalse(this);
  }
}); */
