// The SecretWin State

var SecretWinState = {
	preload: function() {
		//load the preload bar and center it
		var worldwidth = 800;
		var worldheight = 480;

		gamestate = 'postGame';
	},
	create: function() {
		setupControls();
		console.log(game.world.centerX);
		endText = game.add.text(worldwidth / 2,(worldheight / 2),"You found the secret treasure room! You are the greatest pirate who ever lived!", {fill: '#ececec', font: '12px Arial'});
		endText.anchor.setTo(0.5,0.5);
		happyFace = game.add.sprite(worldwidth / 2, worldheight / 4, 'tiny_face');
		happyFace.scale.setTo(0.5,0.5);
		happyFace.anchor.setTo(0.5,0.5);
	}
}