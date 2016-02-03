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