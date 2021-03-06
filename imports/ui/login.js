import { Template } from 'meteor/templating';
import './login.html';

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
        	if(error){
		        console.log(error.reason);
		    } else {
		        Router.go("home");
		    }
        });
    }
});