

class Piece {
	constructor(){
		this.mov = 'images/cut.mp4';
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.parent = null;

		this.init();
	}


	init(){

		this.parent = document.getElementById('video');

	}
}


let piece = new Piece();