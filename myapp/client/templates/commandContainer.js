Template.commandContainer.helpers({
	main_stories: function () {
		var data_step = Session.get('player1-command');
		var curr_step = 'player1-step' + (parseInt(data_step.slice(-1))-1);
		var command =  MainLine.find({code:curr_step},{limit:1});
		return command;
	},
});

Template.commandContainer.events({
	'click .bubble-commander': function () {
		// var data_step = event.target.getAttribute("data-step");
		StoryUpdate();
		// event.target.closest(".bounce").classList.remove('bounce');
		event.target.classList.remove('bounce');
	}

});
