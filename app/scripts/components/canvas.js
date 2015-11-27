'use strict';

const request = require('browser-request');
const async = require('async');


class Canvas {

	constructor(){
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.imgWidth = 270;
		this.imgHeight = 400;

		this.canvas = null;
		this.ctx = null;

		this.imageArray = [];
		this.loadedImages = [];
		this.counter = 0;

		this.firstImageLoaded = false;

		this.init();
	}


	init(){

		let self = this;

		if (self.width < 800){
			self.imgWidth = 168;
			self.imgHeight = 250
		}

		else{
			self.imgWidth = 270;
			self.imgHeight = 400;
		}


		this.loadImages();
	}


	addCanvas(){
		let self = this;

		let title = document.getElementById('title');
		self.canvas = document.createElement('canvas');
		self.canvas.width = self.width;
		self.canvas.height = self.height;
		self.canvas.style.position = 'absolute';
		self.canvas.style.top = '0';
		self.canvas.style.left = '0';
		self.ctx = self.canvas.getContext('2d');

		title.appendChild(self.canvas);

		window.addEventListener('resize', function(){
			self.onResize();
		}, false);

		self.draw();
	}


	onResize(){
		let self = this;

		self.width = window.innerWidth;
		self.height = window.innerHeight;

		self.canvas.width = self.width;
		self.canvas.height = self.height;


		if (self.width < 800){
			self.imgWidth = 168;
			self.imgHeight = 250
		}

		else{
			self.imgWidth = 270;
			self.imgHeight = 400;
		}
	}


	draw(){

		let self = this;
		let toRadians = Math.PI / 180;


		let x = Math.floor(Math.random() * this.width) - 200;

		if (x < 0){
			x = 0;
		}

		let y = Math.floor(Math.random() * this.height);

		//self.ctx.translate(x,y);

		//self.ctx.rotate(self.counter * toRadians);

		self.ctx.drawImage(self.loadedImages[Math.floor(Math.random() * self.loadedImages.length)], x, y, self.imgWidth, self.imgHeight);


		requestAnimationFrame(function(){
			self.draw();
		});
	}



	loadItem(){
		let self = this;

		async.each(self.imageArray, function(image, callback){

			let img = new Image();

			img.onload = function(){
				self.loadedImages.push(img);

				if (self.loadedImages.length === 1 && self.firstImageLoaded === false){
					self.firstImageLoaded = true;
					self.addCanvas();

				}
				callback();
			};

			img.src = image;

		}, function(err){
			if (err){
				console.log('An image failed');
			}

			else{
			}
		});

		console.log(self.loadedImages);
	}


	loadImages(){

		let self = this;


		function onResponse(err, response, body){
			if (err){
				console.log(err);
			}

			else{
				self.imageArray = body.images;
				self.loadItem();
			}

		}

		request({
			method: 'GET',
			url: 'data/data.json',
			json: true
		}, onResponse);


	}

};


module.exports = Canvas;