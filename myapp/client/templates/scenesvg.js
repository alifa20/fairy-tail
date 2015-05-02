/*Template.scenesvg.color = function() {
	return "#50728C";
};
*/

Template.scenesvg.helpers({
	"color": function(event){
		return "#50728C";
	}
});

Template.scenesvg.events({
	"mouseover ellipse":function(event){
		s = Snap(400, 620);

		var path = s.path("M94.2,265.7L82,203.4c43.3-15.6,83.8-29.2,137.1-20.2c61.5-27.6,126.1-56.9,202.6 46.1c18.7,18.9,21.5,39.8,12.2,62.3C322.7,231.9,208.2,247.6,94.2,265.7z");

		path.animate({ d: "M179.4,83.5l62.4-11.8c15.3,43.4-76,102.6-22.6,111.5c61.5-27.6,126.1-56.9,202.6-46.1c18.7,18.9,21.5,39.8,12.2,62.3C250.6,296.7,52.4,259.2,179.4,83.5z" }, 1000, mina.bounce);
	}
});