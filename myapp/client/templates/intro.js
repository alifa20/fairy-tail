// counter starts at 0
Session.setDefault('counter', 0);

Template.intro.helpers({
	counter: function () {
		return Session.get('counter');
	}
});

Template.intro.events({
	'click button': function () {
		// increment the counter when button is clicked
		Session.set('counter', Session.get('counter') + 1);
		
	},
	'click .next':function(){
		var elem = document.querySelectorAll('.sub-container .active')[0];
		var next = parseInt(elem.getAttribute('data-page')) + 1; 
		if (next===4) {return;};
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

