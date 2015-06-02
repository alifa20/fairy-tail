Router.route('/log',function(){
	this.render('logtemplate');
});

Router.route('/',function(){
	this.render('home');
});

MainLine = new Mongo.Collection("main_story");
PlayerAction = new Mongo.Collection("player_action");
StoryUpdate = function(data_step) { 
	if (!data_step) {
		data_step = Session.get('player1-command');
	}
	console.log('updating ' + data_step);
	// var next_step = 'player1-step' + (parseInt(data_step.slice(-1))+1);
	var command =  MainLine.find({code:data_step},{limit:1}).fetch()[0].command;
	if (command==="show-intro") {
		var overlay = document.getElementsByClassName('overlay-intro-container')[0];
		overlay.classList.remove('hidden');
		SessionCommandUpdate();
		return false;
	}
	if (command === 'show-map-threads') {
		var bubble2_arrow = document.getElementsByClassName('bubble2-arrow')[0];
		bubble2_arrow.classList.remove('hidden');
		bubble2_arrow.classList.add('bounce');
		SessionCommandUpdate();
		return false;
	}
	if (command==="show-princess") {
		var bubble_arrow = document.getElementsByClassName('bubble2-arrow')[0];
		bubble_arrow.classList.remove('bounce');
		bubble_arrow.classList.add('hidden');

		var bubble_arrow_active = document.getElementsByClassName('bubble3-arrow')[0];
		bubble_arrow_active.classList.remove('hidden');
		bubble_arrow_active.classList.add('bounce');

		var overlay = document.getElementsByClassName('container-princess-sub')[0];
		overlay.style.opacity = "1.0";
		overlay.style.filter  = 'alpha(opacity=90)'; 
		SessionCommandUpdate();
		return false;
	}
	if (command==="show-prince") {

		var bubble_arrow = document.getElementsByClassName('bubble3-arrow')[0];
		bubble_arrow.classList.remove('bounce');
		bubble_arrow.classList.add('hidden');

		var bubble_arrow_active = document.getElementsByClassName('bubble1-arrow')[0];
		bubble_arrow_active.classList.remove('hidden');
		bubble_arrow_active.classList.add('bounce');

		var overlay = document.getElementsByClassName('container-prince-sub')[0];
		overlay.style.opacity = "1";
		overlay.style.filter  = 'alpha(opacity=90)'; 
		SessionCommandUpdate();
		return false;
	}
	return false;
};

SessionCommandUpdate = function(data_step){
	if (!data_step) {
		data_step = Session.get('player1-command');
	}
	var next_num = parseInt(data_step.slice(-1))+1;
	Session.set('player1-command', 'player1-step'+next_num);
	return;
}

if (Meteor.isClient) {
	Session.setDefault('player1-command', 'player1-step1');

}

if (Meteor.isServer) {
	Meteor.startup(function () {
    // code to run on server at startup
    // Backbone.history.start({pushState: true});
});
}
