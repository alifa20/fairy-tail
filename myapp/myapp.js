MainLine = new Mongo.Collection("main_story");

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
      },

    });
  }

  if (Meteor.isServer) {
    Meteor.startup(function () {
    // code to run on server at startup
  });
  }
