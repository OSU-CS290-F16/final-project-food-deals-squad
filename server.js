var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var events = require('./events');
var port = process.env.PORT || 3000;


// Use Handlebars as the view engine for the app.
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars');


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(request, response) {
    console.log("== Got request for:", request.url, "\n");

    response.render('index-page', {
        title: 'Food Deal Squad',
        events: events
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
