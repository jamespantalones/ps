'use strict';


const Headroom = require('headroom.js');


class Nav {
	constructor(){
		this.init();
	}

	init(){

		let scroller = document.getElementById('container');

		Headroom.options.scroller = scroller;

		let header = document.getElementById('nav');
		let headroom = new Headroom(header);


		

		headroom.init();
	}
};

module.exports = Nav;