import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { Pesanan } from '../api/db.js';
import { TipeKamar } from '../api/db.js';
import { Kamar } from '../api/db.js';

import './pesan.html';


Router.route('/pesan', function (a) {
  this.layout('cek', {
    data: function(b) {
    	var id = a.url.slice(32);
    	console.log(id);
      return TipeKamar.findOne({tipe: id});
    }

  });
});

Router.route('/pesanan', function (a) {
  this.layout('pesanan', {
    data: function(b) {
      return Pesanan.find();
    }

  });
});


Template.pesan.helpers({
	'email': function(){
		var mail;
		mail = Meteor.user().emails[0].address;
		username = Meteor.user().username;	
		console.log(mail);
		console.log(username);
		return mail;
	},
});

Template.pesan.events({
	'click .datepicker': function(){
		$('.datepicker').pickadate({
		    selectMonths: true, // Creates a dropdown to control month
		    selectYears: 15, // Creates a dropdown of 15 years to control year,
		    today: 'Today',
		    clear: 'Clear',
		    close: 'Ok',
		    closeOnSelect: false // Close upon selecting a date,
	 	 });
	},
	'change #start': function(event){
		event.preventDefault();
		if ( ($('#start').val() != "") && ($('#end').val() != "")) {
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            var firstDate = new Date($('#start').val());
            var secondDate = new Date($('#end').val());
            var diffDays = Math.round(Math.round((secondDate.getTime() - firstDate.getTime()) / (oneDay)));
        	$('#hari').val(diffDays);
			
			$('#total').val($('#hari').val() * $('#harga').val()); 
        };	
	},
	'change #end': function(event){
		event.preventDefault();
		if ( ($('#start').val() != "") && ($('#end').val() != "")) {
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            var firstDate = new Date($('#start').val());
            var secondDate = new Date($('#end').val());
            var diffDays = Math.round(Math.round((secondDate.getTime() - firstDate.getTime()) / (oneDay)));
        	$('#hari').val(diffDays);

        	$('#total').val($('#hari').val() * $('#harga').val());
        };	
	},
	'click #btn_bayar': function(){
		var tipeKamar = $('#tipeKamar').val() 
		var cek = Kamar.find({status: 0, tipe: tipeKamar}).count();
		console.log(cek);
		console.log($('#tipeKamar').val());
		if (cek != 0) {
			var kamar = Kamar.findOne({status: 0, tipe: tipeKamar});
			Kamar.update(kamar._id, {$set: {status: 1}
			}, function(error) {
				if (error) {
					console.log(error.reason);
				}
			});
			Pesanan.insert({
				username: Meteor.user().username,
				email: Meteor.user().emails[0].address,
				kamar: kamar.kamar,
				start: $('#start').val(),
				end: $('#end').val(),
				banyak_hari: $('#hari').val(),
				total: $('#total').val()
			});
			Materialize.toast(kamar.kamar, 4000);
			Router.go('pesanan');
		} else {
			Materialize.toast('Mohon maaf, untuk tipe ini kamar sudah penuh, silahkan pilih tipe kamar yang lain', 3000);
		}
	}
});
