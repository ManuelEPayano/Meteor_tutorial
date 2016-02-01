console.log("Hello world"); //Check that the WebApp is up.
PlayersList = new Mongo.Collection('players'); // Starts the global variable PlayerList and the player collection
if(Meteor.isClient){
    console.log("Hello Client");
    Template.leaderboard.helpers({
        'player':function(){
            return "Some other text"  
        },
        'score':function(){
            return "Some other helper"
        }
    });
}
if(Meteor.isServer){
    console.log("Hello Server");
}