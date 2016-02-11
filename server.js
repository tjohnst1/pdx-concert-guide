// Setup
var fs = require('fs');
var request = require('request');
var async = require('async');
var Firebase = require('firebase');
var firebaseRef = new Firebase("https://concertlistings.firebaseio.com/");


// Config
var eventJson = [];
var eventArr = [];
var eventsWithAddress = [];
var songkickAPI = "http://api.songkick.com/api/3.0/metro_areas/12283/calendar.json?apikey=ewhKf5A1zoFbcx0A";
var totalEntries;

request(songkickAPI, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var json = JSON.parse(body);
    totalEntries = json.resultsPage.totalEntries
    eventJson = json.resultsPage.results.event;
    eventJson.forEach(function(event){
      eventArr.push({
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

    var pages = [];
    for (var i = 2; i <= Math.floor(totalEntries / 50); i++){
      pages.push(i)
    }

    async.eachSeries(pages, function(page, callback){
      var url = `http://api.songkick.com/api/3.0/metro_areas/12283/calendar.json?page=${page}&apikey=ewhKf5A1zoFbcx0A`;
      console.log(url)
      request(url, function (error, response, body) {
        var newJson = JSON.parse(body);
        var moreEvents = newJson.resultsPage.results.event;
        moreEvents.forEach(function(event){
          eventArr.push({
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
        callback();
      });
    });

    async.eachSeries(eventArr, function(event, callback){
      var lat = event.venue.lat;
      var lng = event.venue.lng;
      var url = `http://dev.virtualearth.net/REST/v1/Locations/${lat},${lng}?&key=AoptJWHwthubAVKukzeMwwRQmYJhKCUGuU1McqBvZM6TGobqdQoYvFn35G3vbHTH`;

      request(url, function (error, response, body) {
        var json = JSON.parse(body);
        var newEvent = event;
        newEvent.venue.address = json.resourceSets[0].resources[0].address.formattedAddress;
        eventsWithAddress.push(newEvent);
        callback();
      });
    }, function(err){
        fs.writeFile('something.json', JSON.stringify({events: eventsWithAddress}, null, 4), (err) => {
          if (err) throw err;
          console.log('It\'s saved!');
        });
        // eventsWithAddress.forEach(function(event){
        //   firebaseRef.push(event);
        // })
    });
  }

});
