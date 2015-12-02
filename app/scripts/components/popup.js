'use strict';




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
		popup.onmousedown = function(){
			self.initDrag(this);
		};

		document.onmouseup = function(e){
			self.destroy();
		};

		document.onmousemove = function(e){
			self.move(e);
		};

		// ------------------------------------------------
		// Listen for clicks on exit
		//
		
		let exit = document.getElementById('exit');
		exit.addEventListener('click', self.close.bind(this), false);

		// ------------------------------------------------
		// Listen for clicks on buttons
		//
		let buttonsParent = document.getElementById('buttons');
		let buttons = buttonsParent.childNodes;

		for (let i = 0; i < buttons.length; i++ ){
			buttons[i].addEventListener('click', function(){
				self.close();
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
		self.xPos = document.all ? window.event.clientX : e.pageX;
		self.yPos = document.all ? window.event.clientY : e.pageY;

		if (self.dragObj !== null){
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


	close(){
		let self = this;

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

		console.log(self.popupOpen);

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
			console.log(imgContainer);

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