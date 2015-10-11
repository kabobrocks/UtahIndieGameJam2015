// The Win State

var WinState = {
	preload: function() {
		//load the preload bar and center it
		var worldwidth = 800;
		var worldheight = 480;

		gamestate = 'postGame';
	},
	create: function() {
		setupControls();
		endText = game.add.text(worldwidth / 2,(worldheight / 2),"You made it to the end! However, you did not find Grandpa Skellybones' greatest treasure!", {fill: '#ececec', font: '12px Arial'});
		endText.anchor.setTo(0.5,0.5);
		happyFace = game.add.sprite(worldwidth / 2, worldheight / 4, 'happyFace');
		happyFace.scale.setTo(0.25,0.25);
		happyFace.anchor.setTo(0.5,0.5);
	}
}