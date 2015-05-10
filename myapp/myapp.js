MainLine = new Mongo.Collection("main_story");
PlayerAction = new Mongo.Collection("player_action");


if (Meteor.isClient) {
    // This code only runs on the client
    Template.body.helpers({
      main_stories: function () {
        // var h = document.getElementById("command_container");
        // var stuck = false;
        // function getDistance() {
        //   var topDist = h.offsetTop;
        //   return topDist;
        // }
        // var stickPoint = getDistance();

        // window.onscroll = function(e) {
        //   var distance = getDistance() - window.pageYOffset;
        //   var offset = window.pageYOffset;
        //   if ( (distance <= 0) && !stuck) {
        //     h.style.position = 'fixed';
        //     h.style.top = '0px';
        //     stuck = true;
        //   } else if (stuck && (offset <= stickPoint)){
        //     h.style.position = 'static';
        //     stuck = false;
        //   }
        return MainLine.find({},{sort: {createdAt:-1}});
      },
    });

Template.body.events({
  "click .cmd_btn":function(event){
    console.log(event.target.attributes["data-step"]);

    var d = new Date();
    MainLine.insert({
      text: event.target.attributes["data-step"].value + " clicked " + d.getHours() +":"+d.getMinutes()+":"+d.getSeconds(),
      createdAt: new Date()
    });
    PlayerAction.insert({
      command: "wave",
      createdAt: new Date(),
      enabled: 1
    });
    return false;
  },
  "click .cmd_intro":function(event){
    var overlay = document.getElementsByClassName('overlay-intro')[0];
    overlay.style.display = 'block';
    return false;
  },
  "click .close":function(event){
    var overlay = document.getElementsByClassName('overlay-intro')[0];
    overlay.style.display = 'none';
    return false;
  }
});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    // Backbone.history.start({pushState: true});
  });
}
