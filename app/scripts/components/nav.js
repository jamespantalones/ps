'use strict';

// -------------------------------------------------
//
// Set up nav + hide and show on scroll
// 
// -------------------------------------------------

const Headroom = require('headroom.js');


class Nav {
	constructor(){
		this.init();
	}

	init(){

		//set scroll element to be #container instead of default window
		let scroller = document.getElementById('container');
		Headroom.options.scroller = scroller;

		let header = document.getElementById('nav');
		let headroom = new Headroom(header);


		

		headroom.init();
	}
};

module.exports = Nav;