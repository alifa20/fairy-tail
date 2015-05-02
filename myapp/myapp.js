MainLine = new Mongo.Collection("main_story");
String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
  }

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
