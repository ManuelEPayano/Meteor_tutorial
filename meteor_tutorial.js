console.log("Hello world"); //Check that the WebApp is up.
PlayersList = new Mongo.Collection('players'); // Starts the global variable PlayerList and the player collection
if(Meteor.isClient){
    console.log("Hello Client");
    Template.leaderboard.events({
        'click .player': function(){
            var playerId = this._id;
            Session.set('selectedPlayer', playerId);
            var selectedPlayer = Session.get('selectedPlayer');
            console.log(selectedPlayer); //displays the selected player's ID"s
        },
        'click .increment': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            PlayersList.update(selectedPlayer, {$inc: {score: 5} });
        },
        'click .decrement': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            PlayersList.update(selectedPlayer, {$inc: {score: -5} });
        },
        'click .remove': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            PlayersList.remove(selectedPlayer);
        }
    });
    Template.leaderboard.helpers({
        'player':function(){
            var currentUserId = Meteor.userId();
            return PlayersList.find({createdBy: currentUserId},
                            {sort: {score: -1, name: 1}});
        },
        'selectedClass': function(){
            var playerId = this._id;
            var selectedPlayer = Session.get('selectedPlayer');
            if(playerId == selectedPlayer){
                return "selected"
            }
        },
        'showSelectedPlayer': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            return PlayersList.findOne(selectedPlayer)
        }
    });
    Template.addPlayerForm.events({
        'submit form': function(){
            event.preventDefault();
            var playerNameVar = event.target.playerName.value;
            var currentUserId = Meteor.userId();
            console.log(playerNameVar);
            PlayersList.insert({
                name: playerNameVar,
                score: 0,
                createdBy: currentUserId
            });
        }
    });
}
if(Meteor.isServer){
    console.log("Hello Server");
}