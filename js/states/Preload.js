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

		//load all of the images

		//load any text images that we have

		//load any weapons we may include

		//load our sounds

		//load our tilemaps
		game.load.tilemap('level1', './assets/tilesets/level1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('mariotileset', './assets/tilesets/mariotileset');
	},
	create: function() {
		var preloadText = game.add.text(game.world.centerX, game.world.centerY - 40, 'Use the arrow keys to move | Space to jump | I to interact', {fill: '#ececec', font: '12px Arial' });
		preloadText.x = game.world.centerX - preloadText.width / 2;
		preloadbar.crop.width = preloadbar.width;
		var tween = game.add.tween(preloadbar).to({ alpha: 0 }, 1000, Phaser.Easing.Liner.None, true);
		tween.onComplete.addOnce(function() {
			game.state.start('Level1');
		})
	}
}