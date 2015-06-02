Template.logtemplate.helpers({
	current_session: function(){
		return Session.get('player1-command');
	}
});

Template.logtemplate.events({
	'click button.reset-session':function(){
		Session.set('player1-command', 'just-started');
	}
});
