import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { TipeKamar } from '../imports/api/db.js';
import { Kamar } from '../imports/api/db.js';

import './main.html';
import '../imports/ui/login.js'
import '../imports/ui/register.js'
import '../imports/ui/pesan.js'



Router.route('/', {
	name: 'home',
	template: 'home'

});

Router.route('/login', {
	name: 'login',
	template: 'login'
});

Router.route('/register', {
	name: 'register',
	template: 'register'
});



Template.home.helpers({
	tipeKamar() {
		return TipeKamar.find({});
	}
});

Template.konten.events({
	'click #btnpesan2': function(event){
		$('#btnpesan2').disabled = true;

	},
});

Template.navbar.events({
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
		Router.go('login');
	},
	'click .dropdown-button': function(event){
		event.preventDefault();
		$(".dropdown-button").dropdown();
	},
	'click #profil': function(event){
		Materialize.toast('I am a toast!', 4000);	
	},
	'click  #refresh': function(){
		Meteor._reload.reload();
	},
});
