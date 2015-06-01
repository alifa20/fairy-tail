Template.commandContainer.helpers({
	main_stories: function () {
		var command =  MainLine.find({code:Session.get('player1-command')},{limit:1});
		return command;
	},
});

Template.commandContainer.events({
	'click button': function () {
	}
});
