// Setup
var fs = require('fs');
var request = require('request');
var async = require('async');
var Firebase = require('firebase');
var firebaseRef = new Firebase("https://concertlistings.firebaseio.com/");


// Config

var unformattedEvents = [];
var formattedEvents = [];
var moreFormattedEvents = [];
var songkickAPI = "http://api.songkick.com/api/3.0/metro_areas/12283/calendar.json?apikey=ewhKf5A1zoFbcx0A";

request(songkickAPI, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var json = JSON.parse(body);
    unformattedEvents = json.resultsPage.results.event;
    unformattedEvents.forEach(function(event){
      formattedEvents.push({
        id: event.id,
        venue: {
          name: event.venue.displayName,
          lat: event.venue.lat,
          lng: event.venue.lng
        },
        artists: event.performance.map(function(artist){
          return artist.artist.displayName
        }),
        date: {
          day: event.start.date,
          time: event.start.time
        }
      })
    });

    async.eachSeries(formattedEvents, function(event, callback){
      var lat = event.venue.lat;
      var lng = event.venue.lng;
      var url = `http://dev.virtualearth.net/REST/v1/Locations/${lat},${lng}?&key=AoptJWHwthubAVKukzeMwwRQmYJhKCUGuU1McqBvZM6TGobqdQoYvFn35G3vbHTH`;

      request(url, function (error, response, body) {
        var json = JSON.parse(body);
        var newEvent = event;
        newEvent.venue.address = json.resourceSets[0].resources[0].address.formattedAddress;
        moreFormattedEvents.push(newEvent);
        callback();
      });

    }, function(err){
        console.log(moreFormattedEvents);
    });

    
    // formattedEvents.forEach(function(event){
    //   firebaseRef.push(event);
    // })
  }
})

// async.map(formattedEvents, function(event, callback){
//   var lat = event.venue.lat;
//   var lng = event.venue.lng;
//   var url = `http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
//   request(url, function (error, response, body) {
//     callback(error, body);
//   });
// }, function(err, results){
//   console.log(results);
// });
