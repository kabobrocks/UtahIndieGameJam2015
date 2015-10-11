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
		//game.load.spritesheet('skellies', 'assets/skellies.png', 64, 64);

		//load all of the images
		game.load.image('door', 'assets/door.png');
		game.load.image('pirate','assets/pirate.png');
		game.load.spritesheet('pirateSpriteSheet', 'assets/pirateSpritesheet.png', 64, 64);
		game.load.image('doorkey', 'assets/doorkey.png');
		game.load.image('lifesaver', 'assets/lifesaver.png');
		game.load.image('chest', 'assets/chest.png');
		game.load.image('secretWall', 'assets/secretWall.png');
		game.load.image('happyFace', 'assets/happyFace.png');
		game.load.image('tiny_face', 'assets/tiny_face.png');
		game.load.image('goal', 'assets/goal.png');
		game.load.image('secretGoal', 'assets/secretGoal.png');
		game.load.image('skelly', 'assets/skelly.png');
		game.load.image('ending1', 'assets/ending1.jpg');
		game.load.image('ending2', 'assets/ending2.jpg');


		//loading the hint scrolls
		game.load.image('scroll1a', 'assets/scroll1a.png');
		game.load.image('scroll2a', 'assets/scroll2a.png');
		game.load.image('scroll3a', 'assets/scroll3a.png');
		game.load.image('scroll4a', 'assets/scroll4a.png');

		//load background level stuff
		game.load.image('bg-level1-sky','assets/bg-level1-sky.jpg');
		game.load.image('bg-level1-front','assets/bg-level1-front.png');
		game.load.image('bg-level1-middle','assets/bg-level1-middle.png');

		//load any text images that we have

		//load any weapons we may include

		//load our sounds
		game.load.audio('jump', 'assets/sounds/jump.wav');
		game.load.audio('lose', 'assets/sounds/lose.wav');
		game.load.audio('keyPickup', 'assets/sounds/keyPickup.wav');
		game.load.audio('doorOpen', 'assets/sounds/doorOpen.wav');
		game.load.audio('doorLocked', 'assets/sounds/doorLocked.wav');
		game.load.audio('talkToAI', 'assets/sounds/talkToAI.wav');
		game.load.audio('level1', 'assets/sounds/level1.mp3');

		//load our tilemaps
		game.load.tilemap('level1', 'assets/tilesets/level1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('pirateTileSet', 'assets/tilesets/piratetileset.png');

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