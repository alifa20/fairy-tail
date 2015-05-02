MainLine = new Mongo.Collection("main_story");

if (Meteor.isClient) {
    // This code only runs on the client
    Template.body.helpers({
      main_stories: function () {
        return MainLine.find({},{sort: {createdAt:-1}});
      }
    });

    Template.body.events({
      "click .cmd_btn":function(event){
        console.log(event.target.attributes["data-step"]);

        var d = new Date();
        MainLine.insert({
          text: event.target.attributes["data-step"].value + " clicked " + d.getHours() +":"+d.getMinutes()+":"+d.getSeconds(),
          createdAt: new Date()
        });
        return false;
      }

    });
  }

  if (Meteor.isServer) {
    Meteor.startup(function () {
    // code to run on server at startup
  });
  }
