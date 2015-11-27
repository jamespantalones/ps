'use strict';


const Canvas = require('./components/canvas');
const social = require('./components/social');
const Popup = require('./components/popup');
const Video = require('./components/video');
const Nav = require('./components/nav');

class Piece {
	
	constructor(){
		this.mov = 'images/cut.mp4';
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.parent = null;
		this.collage = null;

		this.currentPop = null;

		this.init();
	}


	init(){

		let self = this;

		let nav = new Nav();
		
		// ------------------------------------------------
		// Add canvas
		//
		this.collage = new Canvas();

		
		// ------------------------------------------------
		// Bind socials
		//
		this.bindSocials();

		// ------------------------------------------------
		// Prep vids
		//
		this.bindVideos();
		

		// ------------------------------------------------
		// Set up popups
		//
		this.currentPop = new Popup();
		
	}

	// ------------------------------------------------
	// Listen for clicks on videos
	//
	bindVideos(){
		let self = this;
		let videos = document.getElementsByClassName('video-inner');

		for (let i = 0; i < videos.length; i++ ){
			videos[i].addEventListener('click', self.playVideo, false);
		}
	}


	// ------------------------------------------------
	// Instantiate new video
	//
	playVideo(){
		console.log('click');
		let target = this;
		let src = target.getAttribute('data-src');

		let video = new Video(target, src);
	}
	
	


	// ------------------------------------------------
	// Listen for clicks on social elements
	//
	bindSocials(){
		let self = this;
		let socials = document.getElementsByClassName('share-icon');

		for (let i = 0; i < socials.length; i++ ){
			socials[i].addEventListener('click', self.share, false);
		}
	}



	// ------------------------------------------------
	// Share to correct platform
	//
	share(ev){
		ev.preventDefault();

		let site = this.getAttribute('data-site');
		social(site);
	}
	
}


let piece = new Piece();