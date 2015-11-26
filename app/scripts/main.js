'use strict';


const Canvas = require('./components/canvas');

class Piece {
	constructor(){
		this.mov = 'images/cut.mp4';
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.parent = null;
		this.collage = null;

		this.popupOpen = false;
		this.dragObj = null;

		this.init();
	}


	init(){

		let self = this;
		
		// ------------------------------------------------
		// Add canvas
		//
		
		this.collage = new Canvas();


		// ------------------------------------------------
		// Bind triggers
		//
		this.bindPops();

		// ------------------------------------------------
		// Bind mousemoves
		//
		document.onmouseup = function(e){
			self.dragObj = null;
		};

		document.onmousemove = function(e){
			let x = e.pageX;
			let y = e.pageY;

			if (self.dragObj === null){
				return;
			}

			self.dragObj.style.left = (x - 20) + 'px';
			self.dragObj.style.top = (y - 20) + 'px';

		};
		
		

	}

	bindPops(){

		let self = this;

		let pops = document.getElementsByClassName('pop-ad');

		for (let i = 0; i < pops.length; i++ ){
			pops[i].addEventListener('click', function(e){
				e.preventDefault();
				self.onPopClick(this);
			}, false);
		}
	}


	onPopClick(item){
		let self = this;

		let popupContainer = document.getElementById('popup-container');
		let popup = document.getElementById('popup');
		let popupMessage = document.getElementById('message');
		let exit = document.getElementById('exit');


		function closePop(){
			popupContainer.classList.remove('active');
			self.popupOpen = false;
		}

		if (self.popupOpen === false){
			
			let msg = item.getAttribute('data-msg');


			popupMessage.innerHTML = msg;

			popupContainer.classList.add('active');

			self.popupOpen = true;

			popup.onmousedown = function(){
				self.dragObj = popup;
			}

			exit.addEventListener('click', closePop, false);


		}

		else{
			self.popupOpen = false;
			popupContainer.classList.remove('active');
		}

		


	}
}


let piece = new Piece();