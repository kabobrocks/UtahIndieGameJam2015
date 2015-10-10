//The Boot State
BootState = {
	preload: function() {
		game.load.image('preloadbar', 'assets/preloadbar.png');
		game.load.image('orientation', 'assets/orientation.jpg');
	},
	create: function() {
		//dimensions for the game window
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.maxWidth = 800;
		game.scale.maxHeight = 480;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.setScreenSize(true);
		game.stage.smoothed = true;

		// start the preload state
		game.state.start('preload');
	}
}