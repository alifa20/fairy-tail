MainLine = new Mongo.Collection("main_story");
PlayerAction = new Mongo.Collection("player_action");

if (Meteor.isClient) {
  Session.setDefault('player1-command', 'just-started');

    // This code only runs on the client
    Template.body.helpers({
      player1_running_command: function () {
        return Session.get('player1-command');
      },
    });

    Template.body.events({
      "click .cmd_btn":function(event){
    // console.log(event.target.attributes["data-step"]);

    // var d = new Date();
    // MainLine.insert({
    //   text: event.target.attributes["data-step"].value + " clicked " + d.getHours() +":"+d.getMinutes()+":"+d.getSeconds(),
    //   createdAt: new Date()
    // });
    // PlayerAction.insert({
    //   command: "wave",
    //   createdAt: new Date(),
    //   enabled: 1
    // });
    Session.set('player1-command', event.target.getAttribute("data-step"));
    var command =  MainLine.find({code:Session.get('player1-command')},{limit:1}).fetch()[0].command;
    var next_num = parseInt(event.target.getAttribute("data-step").slice(-1))+1;
    event.target.setAttribute("data-step","player1-step"+next_num);
    if (command==="show-intro") {
      var overlay = document.getElementsByClassName('overlay-intro')[0];
      overlay.style.display = 'block';
      return false;
    }
    if (command==="show-princess") {
      var overlay = document.getElementsByClassName('container-princess-sub')[0];
      overlay.style.opacity = "1.0";
      overlay.style.filter  = 'alpha(opacity=90)'; 
      return false;
    }
    if (command==="show-prince") {
      var overlay = document.getElementsByClassName('container-prince-sub')[0];
      overlay.style.opacity = "1";
      overlay.style.filter  = 'alpha(opacity=90)'; 
      return false;
    }
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
