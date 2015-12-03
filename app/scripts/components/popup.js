'use strict';

const Hammer = require('hammerjs');


class Popup {

	constructor(){
		this.visible = false;

		this.xPos = 0;
		this.yPos = 0;

		//x y, top left vals of element
		this.elX = 0;
		this.elY = 0;

		this.container = null;
		this.dragObj = null;
		this.popupOpen = false;
		this.hammertime = null;

		this.init();
	}


	init(){

		let self = this;

		

		//bind all ads to watch for clicks
		this.activateAds();


		this.container = document.getElementById('popup-container');
		
		
		// ------------------------------------------------
		// Bind mousemoves
		//
		let popup = document.getElementById('popup');

		this.hammertime = new Hammer(popup);


		// ------------------------------------------------
		// Touch events
		//
		this.hammertime.on('pan', function(ev){
			self.onTouchMove(ev);
		});

		this.hammertime.on('panend', function(ev){
			self.destroy();
		});
		
		
		

		// ------------------------------------------------
		// Mouse events
		//
		
		popup.onmousedown = function(){
			self.initDrag(this);
		};


		popup.onmouseup = function(e){
			self.destroy();
		};


		popup.onmousemove = function(e){
			self.move(e);
		};


		// ------------------------------------------------
		// Listen for clicks on exit
		//
		
		let exit = document.getElementById('exit');
		
		exit.addEventListener('click', function(e){
			self.close(e);
		}, false);

		// ------------------------------------------------
		// Listen for clicks on buttons
		//
		let buttonsParent = document.getElementById('buttons');
		let buttons = buttonsParent.childNodes;

		for (let i = 0; i < buttons.length; i++ ){
			buttons[i].addEventListener('click', function(e){
				self.close(e);
			}, false);
		}
		


	}

	// ------------------------------------------------
	// Start drag
	//
	
	initDrag(elem){
		let self = this;
		self.dragObj = elem;
		self.elX = self.xPos - elem.offsetLeft;
		self.elY = self.yPos - elem.offsetTop;
	}

	

	// ------------------------------------------------
	// Called while dragging
	//
	move(e){
		let self = this;

		self.xPos = e.clientX;
		self.yPos = e.clientY;

		if (self.dragObj !== null){
			self.dragObj.style.left = (self.xPos - self.elX) + 'px';
			self.dragObj.style.top = (self.yPos - self.elY) + 'px';
		}
	}


	// ------------------------------------------------
	// Mobile touch move
	//
	onTouchMove(ev){
		let self = this;



		self.xPos = ev.center.x;
		self.yPos = ev.center.y;

		if (self.dragObj === null){
			self.dragObj = document.getElementById('popup');
			self.elX = self.xPos - self.dragObj.offsetLeft;
			self.elY = self.yPos - self.dragObj.offsetTop;
		}

		else {
			self.dragObj.style.left = (self.xPos - self.elX) + 'px';
			self.dragObj.style.top = (self.yPos - self.elY) + 'px';
		}
	}

	
	// ------------------------------------------------
	// Destroy object when not needed
	//
	destroy(){
		let self = this;
		self.dragObj = null;
	}


	close(e){
		let self = this;

		e.stopPropagation();


		if (self.container){
			self.container.classList.remove('active');
			self.popupOpen = false;
		}
		else{
			let container = document.getElementById('popup-container');
			container.classList.remove('active');
			self.popupOpen = false;
		}
		
	}
	
	

	onPopClick(item){
		let self = this;

		let popup = document.getElementById('popup');
		let popupMessage = document.getElementById('message');
		




		if (self.popupOpen === false){
			
			let msg = item.getAttribute('data-msg');
			let title = item.getAttribute('data-title');
			let img = item.getAttribute('data-img');
			let imgContainer = null;

			for (let i = 0; i < popup.childNodes.length; i++ ){
				if (popup.childNodes[i].className === 'popup-col'){
					imgContainer = popup.childNodes[i];
					break;
				}
			}

			//add title to title bar
			popup.setAttribute('data-title', title);

			//add text
			popupMessage.innerHTML = msg;

			//place image
			imgContainer.style.background = 'url(' + img + ')';

			//make sure visible
			self.container.classList.add('active');

			self.popupOpen = true;

			


		}

		else{
			self.popupOpen = false;
			self.container.classList.remove('active');
		}

	}



	activateAds(){
		let self = this;

		let pops = document.getElementsByClassName('pop-ad');

		for (let i = 0; i < pops.length; i++ ){
			pops[i].addEventListener('click', function(e){
				e.preventDefault();
				self.onPopClick(this);
			}, false);
		}
	}

};



module.exports = Popup;