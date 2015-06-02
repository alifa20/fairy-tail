// counter starts at 0
Session.setDefault('counter', 0);

Template.intro.helpers({
	counter: function () {
		return Session.get('counter');
	}
});

Template.intro.events({
	'click .close': function (event) {
		event.target.classList.remove('bounce');		
		var overlay = document.getElementsByClassName('overlay-intro-container')[0];
		overlay.classList.add('hidden');
		var bubble_commander = document.getElementsByClassName('bubble-commander')[0];
		bubble_commander.innerHTML = 'Next';
		StoryUpdate();
		return false;
	},
	'click .next':function(){
		var elem = document.querySelectorAll('.sub-container .active')[0];
		var next = parseInt(elem.getAttribute('data-page')) + 1; 
		if (next===4) {
			var close_btn = document.getElementsByClassName('close')[0];
			close_btn.classList.add('bounce');
			return;
		};
		var hidden = document.querySelectorAll('.sub-container .slides')[next];
		elem.classList.add('hidden');
		hidden.classList.add('active');
		elem.classList.remove('active');
		hidden.classList.remove('hidden');
	},
	'click .prev':function(){
		var elem = document.querySelectorAll('.sub-container .active')[0];
		var next = parseInt(elem.getAttribute('data-page')) - 1; 
		if (next===-1) {return;};
		var hidden = document.querySelectorAll('.sub-container .slides')[next];
		elem.classList.add('hidden');
		hidden.classList.add('active');
		elem.classList.remove('active');
		hidden.classList.remove('hidden');
	}
});

