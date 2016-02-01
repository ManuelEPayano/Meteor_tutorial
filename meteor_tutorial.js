console.log("Hello world"); //Check that the WebApp is up.
PlayersList = new Mongo.Collection('players'); // Starts the global variable PlayerList and the player collection
if(Meteor.isClient){
    console.log("Hello Client");
    Template.leaderboard.events({
        'click .player': function(){
            console.log("You clicked a .player element");
        }
    });   
    Template.leaderboard.helpers({
        'player':function(){
            return PlayersList.find() 
        }
    });
}
if(Meteor.isServer){
    console.log("Hello Server");
}