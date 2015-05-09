Template.svg_cat.helpers({
	svg_action: function() {
		svg_walk();
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

Template.svg_cat.events({

});
