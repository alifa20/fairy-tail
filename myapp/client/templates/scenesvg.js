/*Template.scenesvg.color = function() {
  	return "#50728C";
};
*/
var WIDTH = 1024,
HEIGHT = 720;
console.log('oh');

var MainView = Backbone.View.extend({
	initialize: function () {
		
		var i,
		dotGroup,
		animal;

		Math.seedrandom('fish');

		this.state = 0;
		this.dots = [];
		this.animals = [];
		this.trees = [];
		this.treeFaces = [];
		this.s = Snap(document.getElementsByTagName('svg')[0]);
		
		
		//dot animals
		// dotGroup = this.s.select('#dots');
		dotGroup = Snap(document.getElementById("dots"));
		this.dots = dotGroup.selectAll('*');
		
		for (i = 0; i < this.dots.length; i += 1) {
			animal = new PathAnimal({s: this.s, dot: this.dots[i]});
			this.animals.push(animal);
		}
		
		//sort depth 
		for (i = 0; i < this.animals.length; i += 1) {
			if (i > 0) {
				var a = this.animals[i - 1].el,
				b = this.animals[i].el;
				
				if (a.matrix.split().dy > b.matrix.split().dy) {
					a.before(b);
				}
			}
		}
		
		//trees
		this.trees = this.s.selectAll('.tree');
		for (i = 0; i < this.trees.length; i += 1) {
			var tree = new TreeFace({s: this.s, tree: this.trees[i]});
			this.treeFaces.push(tree);
		}
		
		this.cube = document.getElementById('cube');
		var $cubeHitArea = document.getElementById('cube-hitarea');
		// $cubeHitArea.addEventListener('click', this.handle_ROLL.bind(this));
		
		setTimeout(this.animate.bind(this), 3000);
	},

	handle_ROLL: function () {
		this.number = Math.ceil(Math.random() * 6);
		if (this.number == 6) {
			rx = 45;
			ry = 180;
			rz = -45;
		} else if (this.number == 5) {
			rx = 50;
			ry = 0;
			rz = 50;			
		} else if (this.number == 4) {
			rx = -45;
			ry = 50;
			rz = 90;
		} else if (this.number == 3) {
			rx = -45;
			ry = 225;
			rz = -90;
		} else if (this.number == 2) {
			rx = -45;
			ry = 50;
			rz = 0;
		} else if (this.number == 1) {
			rx = 145;
			ry = -45;
			rz = 0;
		} else {
			rx = -90;
			ry = 0;
			rz = 0;
		}
		
		this.cube.style['webkitTransform'] = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) rotateZ(' + rz + 'deg)';
		this.cube.style['MozTransform'] = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) rotateZ(' + rz + 'deg)';		
	},
	
	trigger: function () {
		this.state += 1;//this.number;
		var animal = this.animals[this.state];
		animal.handle_MOUSEOVER();
		
	},

	animate: function () {
		// var tree = this.treeFaces[Math.floor(Math.random() * this.treeFaces.length)];
		// debugger;
		// tree.handle_MOUSEOVER();
		
		// setTimeout(function () {
		// 	tree.handle_MOUSEOUT();
		// }.bind(this), 3000);

		// setTimeout(this.animate.bind(this), 3000);
	}
});

var PathAnimal = Backbone.View.extend({
	initialize: function () {
		var _x,
		_y,
		PATHS = [
		'M0,0c0,0,0-28.008,0-46.707S0-89,0-89',
		'M0,0c0,0-9.634-22.317,10-46.707S50-69,50-69',
		'M0,0c0,0,17.52-24.431,0-56.707S-50-99-50-99'
		];
		
		this.s = this.options.s;
		this.dot = this.options.dot;
		_x = this.dot.attr('cx');
		_y = this.dot.attr('cy');
		
		this.el = this.s.g();
		
		this.path = this.s.path(PATHS[Math.floor(Math.random() * PATHS.length)]);
		this.totalLength = this.dashOffset = this.path.getTotalLength();

		this.path.attr({
			fill: 'none',
			stroke: this.dot.attr('fill'),
			strokeWidth: 25,
			strokeMiterlimit: 10,
			strokeLinecap: 'round',
			opacity: 1,
			strokeDasharray: this.totalLength + " 200",
			strokeDashoffset: this.totalLength
		});
		this.el.add(this.path);
		
		this.el.transform("t" + [_x, _y]);
		
		this.hitarea = this.s.circle(_x, _y, 30);
		this.hitarea.attr({
			fill: 'transparent',
			'class': 'hit-area'
		});

		this.hitarea.mouseover(this.handle_MOUSEOVER.bind(this));
		this.hitarea.mouseout(this.handle_MOUSEOUT.bind(this));
		
		this.addFace();
	},
	
	addFace: function () {
		var mouth,
		eye,
		ey2;
		
		this.face = this.s.g();
		this.face.attr({
			'class': 'face'
		});
		
		mouth = this.s.circle(0, 5, 4);
		mouth.attr({fill: 'black', 'class': 'mouth'});
		this.face.add(mouth);
		
		eye = this.s.path('M-2.75-6.75c0,0-2.537,2.5-5.667,2.5s-5.667-2.5-5.667-2.5s2.537-2.5,5.667-2.5S-2.75-6.75-2.75-6.75z');
		eye.attr({fill: 'white', 'class': 'eye left'});
		this.face.add(eye);
		
		eye2 = this.s.path('M14.583-6.75c0,0-2.537,2.5-5.667,2.5S3.25-6.75,3.25-6.75s2.537-2.5,5.667-2.5S14.583-6.75,14.583-6.75z');
		eye2.attr({fill: 'white', 'class': 'eye right'});
		this.face.add(eye2);
		
		this.face.transform("s.6");
		this.el.add(this.face);
	},
	
	handle_MOUSEOVER: function () {
		var instance = this;

		this.face.attr({
			'class': 'face animating'
		});
		Snap.animate(this.dashOffset, 0, function (val) {
			instance.dashOffset = val;
			instance.render();
		}, 500);
	},
	
	handle_MOUSEOUT: function () {
		var instance = this;

		this.face.attr({
			'class': 'face'
		});
		Snap.animate(this.dashOffset, this.totalLength, function (val) {
			instance.dashOffset = val;
			instance.render();
		}, 500);
	},
	
	render: function () {
		var point;
		
		this.path.attr({
			'stroke-dashoffset': this.dashOffset
		});
		
		point = this.path.getPointAtLength(this.totalLength - this.dashOffset);
		this.face.transform("t" + [point.x, point.y] + "s.6");
	}
});
Template.scenesvg.helpers({
	"color": function(event){
		return "#50728C";
	},
});
Template.scenesvg.onRendered(function(){
	var main = new MainView();
});

Template.scenesvg.events({
	"mouseover ellipse":function(event){
		// console.log("mouseovered ");
		// var s = Snap(document.getElementsByTagName('svg')[0]);
		// var path = s.path("M0,0c0,0,0-28.008,0-46.707S0-89,0-89");
		// var instance = event.target;
		// Snap.animate(this.dashOffset, 0, function (val) {
		// 	instance.dashOffset = val;
		// 	instance.render();
		// }, 500);
		// s = Snap(400, 620);
		// var path = s.path("M94.2,265.7L82,203.4c43.3-15.6,83.8-29.2,137.1-20.2c61.5-27.6,126.1-56.9,202.6 46.1c18.7,18.9,21.5,39.8,12.2,62.3C322.7,231.9,208.2,247.6,94.2,265.7z");
		// path.animate({ d: "M179.4,83.5l62.4-11.8c15.3,43.4-76,102.6-22.6,111.5c61.5-27.6,126.1-56.9,202.6-46.1c18.7,18.9,21.5,39.8,12.2,62.3C250.6,296.7,52.4,259.2,179.4,83.5z" }, 1000, mina.bounce);
		// console.log(event);
		// var instance = event.target;

		
		// event.target.face.attr({
		// 	'class': 'face animating'
		// });
		// Snap.animate(event.target.dashOffset, 0, function (val) {
		// 	instance.dashOffset = val;
		// 	instance.render();
		// }, 500);
}
});


var TreeFace = Backbone.View.extend({
	initialize: function () {
		this.s = this.options.s;
		this.el = this.options.tree;
		
		this.addFace();
		
		/*
		setTimeout(function () {
			this.face.attr({
				'class': 'face animating'
			});
		}.bind(this), Math.random() * 2000 );
		*/
		
		this.hitarea = this.s.circle(0, 0, 40);
		this.hitarea.attr({
			fill: 'transparent',
			'class': 'hit-area'
		});
		this.face.add(this.hitarea);
		this.hitarea.mouseover(this.handle_MOUSEOVER.bind(this));
		this.hitarea.mouseout(this.handle_MOUSEOUT.bind(this));
	},
	
	handle_MOUSEOVER: function () {
		this.face.attr({
			'class': 'face animating'
		});	
	},
	
	handle_MOUSEOUT: function () {
		this.face.attr({
			'class': 'face'
		});
	},
	
	addFace: function () {
		var mouth,
			eye,
			ey2,
			matrix;
		
		this.face = this.s.g();
		this.face.attr({
			'class': 'face'
		});
		/*
		mouth = this.s.circle(0, 5, 4);
		mouth.attr({fill: 'black', 'class': 'mouth'});
		this.face.add(mouth);
		*/
		eye = this.s.path('M-2.75-6.75c0,0-2.537,2.5-5.667,2.5s-5.667-2.5-5.667-2.5s2.537-2.5,5.667-2.5S-2.75-6.75-2.75-6.75z');
		eye.attr({fill: 'white', 'class': 'eye left'});
		this.face.add(eye);
		
		eye2 = this.s.path('M14.583-6.75c0,0-2.537,2.5-5.667,2.5S3.25-6.75,3.25-6.75s2.537-2.5,5.667-2.5S14.583-6.75,14.583-6.75z');
		eye2.attr({fill: 'white', 'class': 'eye right'});
		this.face.add(eye2);
		
		matrix = new Snap.Matrix();
		box = this.el.getBBox();
		matrix.translate(box.cx, box.cy);
		matrix.scale(box.r2 / 40);
		
		this.face.transform(matrix.toTransformString());
		this.el.add(this.face);
	},
});
