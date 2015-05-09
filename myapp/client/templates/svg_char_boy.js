function svg_walk(){
	console.log("in svg_walk");
	var s = Snap("#svg_test");
	var bigCircle = s.circle(150, 150, 100);
}
Template.svg_char_boy.onRendered(function() {
    // regular Snap.svg code here (see docs)
    svg_walk();
});
Template.svg_char_boy.helpers({
	svg_action: function() {
		var latest_action = PlayerAction.find({enabled: 1},{sort: {createdAt:-1}, limit:1}).fetch();
		if (!latest_action[0]) {
			return;
		}
        // console.log('latest_action[0].enabled: '+latest_action[0].enabled);
        if (latest_action[0].enabled) {
        	console.log(latest_action[0].command+":"+latest_action[0]._id);  
        	PlayerAction.update({
        		_id:latest_action[0]._id
        	},{
        		$set:{
        			enabled:0
        		}
        	});
        }

        return;
    }
});

Template.svg_char_boy.events({

});
