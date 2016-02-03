Meteor.subscribe('thePlayers');
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
            Meteor.call('modifyPlayerScore', selectedPlayer, 5);
        },
        'click .decrement': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            Meteor.call('modifyPlayerScore', selectedPlayer, -5);
        },
        'click .remove': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            Meteor.call('removePlayerData',selectedPlayer);
        }
    });
    Template.leaderboard.helpers({
        'player':function(){
            var currentUserId = Meteor.userId();
            return PlayersList.find({}, {sort: {score: -1, name: 1}});
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
            Meteor.call('insertPlayerData', playerNameVar);
        }
});