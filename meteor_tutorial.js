console.log("Hello world"); //Check that the WebApp is up.
PlayersList = new Mongo.Collection('players'); // Starts the global variable PlayerList and the player collection
if(Meteor.isClient){
    
}
if(Meteor.isServer){
    console.log("Hello Server");
    Meteor.publish('thePlayers', function(){
        var currentUserId = this.userId;
        return PlayersList.find({createdBy: currentUserId})
    });
    Meteor.methods({
        'insertPlayerData': function(playerNameVar){
            var currentUserId = Meteor.userId();
            PlayersList.insert({
                name: playerNameVar,
                score: 0,
                createdBy: currentUserId
            });
        },
        'removePlayerData': function(selectedPlayer){
            PlayersList.remove({_id: selectedPlayer, createdBy: currentUserId});
        },
        'modifyPlayerScore': function(selectedPlayer, scoreValue){
            PlayersList.update( {_id: selectedPlayer, createdBy: currentUserId},
                {$inc: {score: scoreValue} });
        }        
    });
}