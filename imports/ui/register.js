import { Template } from 'meteor/templating';
import './register.html';

User = new Mongo.Collection('User');

    
Template.register.events({
  //   'submit form': function(event){
		// event.preventDefault();

		// var fname = $('[name=first_name]').val();
		// var lname = $('[name=last_name]').val();
		// var username = $('[name=username]').val();
  //       var email = $('[name=email]').val();
  //       var password = $('[name=password]').val();
  //       Accounts.createUser({
  //       	fname: fname,
  //       	lname: lname,
  //       	username: username,
  //       	email: email,
  //       	password: password
  //       });

  //       Router.go('home');
  //   },
    'click #register': function(event){
        event.preventDefault();

        var fname = $('[name=first_name]').val();
        var lname = $('[name=last_name]').val();
        var username = $('[name=username]').val();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            fname: fname,
            lname: lname,
            username: username,
            email: email,
            password: password
        });

        Router.go('home');
    }
});

