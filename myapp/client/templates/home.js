// This code only runs on the client
Template.home.helpers({
  player1_running_command: function () {
    return Session.get('player1-command');
  },
});

Template.home.events({
  "click .cmd_btn":function(event){
    var data_step = event.target.getAttribute("data-step");
    StoryUpdate(data_step);
    var next_num = parseInt(data_step.slice(-1))+1;
    event.target.setAttribute("data-step","player1-step"+next_num);
    return false;
  }
   
});