// The PreLoad State

var PreloadState = {
	preload: function() {
		//load the preload bar and center it
		preloadbar = game.add.sprite(0, 0, 'preloadbar');
		preloadbar.x = game.world.centerX - preloadbar.width / 2;
		preloadbar.y = game.world.centerY - preloadbar.height / 2;

		//place the preload bar
		game.load.setPreloadSprite(preloadbar);

		//load all of the spritesheets
		game.load.spritesheet('questionmark', 'assets/door.png', 64, 64);

		//load all of the images
		game.load.image('door', '/assets/door.png', 64, 64);
		game.load.image('pirate','assets/pirate.png', 64,64);
		game.load.image('bg-level1-sky','assets/bg-level1-sky.jpg');
		game.load.image('bg-level1-front','assets/bg-level1-front.png');
		game.load.image('bg-level1-middle','assets/bg-level1-middle.png');

		//load any text images that we have

		//load any weapons we may include

		//load our sounds
		game.load.audio('jump', '/assets/sounds/jump.wav');
		game.load.audio('lose', '/assets/sounds/lose.wav');

		//load our tilemaps
		game.load.tilemap('level1', './assets/tilesets/level1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('mariotileset', './assets/tilesets/mariotileset.png');

	},
	create: function() {
		var preloadText = game.add.text(game.world.centerX, game.world.centerY - 40, 'Use the arrow keys to move | Space to jump | I to interact', {fill: '#ececec', font: '12px Arial' });
		preloadText.x = game.world.centerX - preloadText.width / 2;
		preloadbar.crop.width = preloadbar.width;
		var tween = game.add.tween(preloadbar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
		tween.onComplete.addOnce(function() {
			game.state.start('1');
			//game.state.start('level1'); //change to this when menu exists!
		})
	}
}