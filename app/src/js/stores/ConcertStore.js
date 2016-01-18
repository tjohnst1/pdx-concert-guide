import { dispatch, register } from '../dispatcher/dispatcher';
import Constants from '../constants/constants';
import { EventEmitter } from 'events';


var CHANGE_EVENT = 'change';

var _concerts = [];

const ConcertStore = Object.assign(EventEmitter.prototype, {

  emitChange(){
    this.emit( CHANGE_EVENT );
  },

  addChangeListener(callback){
    this.on( CHANGE_EVENT, callback);
  },

  removeChangeListener(callback){
    this.removeListener( CHANGE_EVENT, callback );
  },

  getConcerts(){
    const url = 'http://api.bandsintown.com/events/search.json?location=Portland,OR&app_id=PDXConcertGuide';
    $.get(url, (data) => {
      _concerts = data;
    })
    console.log(_concerts)
    return _concerts;
  }

})
