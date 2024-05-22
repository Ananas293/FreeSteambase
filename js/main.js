const { createApp, ref } = Vue;

var app = createApp({	
	data: () => ({
		hintText:'',
		games:games,
		hintVisible:false,
		search:'',
		pageList:true,
		pageAppInfo:false,
		currentGame:{}
	}),
	watch:{
		search(current, old){
			setTimeout(() => updateGrid(), 10);
			this.hint();
		}
	},
	computed:{
		gameList(){
		  return this.games.filter(game => {
			return (
			  (''+game.name).toLowerCase().includes((''+this.search).toLowerCase()) ||
			  (''+game.altName).toLowerCase().includes((''+this.search).toLowerCase())
			);
		  });
		}
	},
	methods:{
		hint(text){
			this.hintVisible = !!(text);
			this.hintText = text;
		},
		goToAppInfo(game){
			this.pageList = false;
			this.pageAppInfo = true;
			this.hint();
			this.currentGame = game;
			window.scrollTo(0, 0);
		},
		goToList(){
			this.pageAppInfo = false;
			this.pageList = true;
			this.search = '';
			this.currentGame = {};
			window.scrollTo(0, 0);
			this.hint();
			setTimeout(() => updateGrid(), 10);
		}
	}
}).mount('#app');



// Hint
var _hint = document.getElementById('hint');
document.addEventListener('mousemove', function(e){
	var x = e.pageX; 
	var y = e.pageY;
	var doc_x = document.body.clientWidth;
	var doc_y = document.documentElement.offsetHeight;
	var hint_x = _hint.clientWidth + 2;
	var hint_y = _hint.clientHeight + 2;
	var margin = 25;
	var _x = ((x + hint_x + margin) > doc_x)? (x - hint_x - margin) : x;
	var _y = ((y + hint_y + margin) > doc_y)? (y - hint_y - margin) : y;
	_hint.style.left = _x + 'px';
	_hint.style.top = _y + 'px';
}, false);


// Grid
var updateGrid = function(){
	new Masonry( document.querySelector('.grid'), {
		itemSelector: '.grid-item',
		columnWidth: 250,
		gutter: 20,
		fitWidth: true
	});
}
updateGrid();

document.querySelector('form').addEventListener('keypress', function(event) {
	if (event.key === 'Enter') {
		event.preventDefault();
	}
});

var clipboard = new ClipboardJS('tr');