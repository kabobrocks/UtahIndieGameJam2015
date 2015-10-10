// initialize the game
var game = new Phaser.Game(worldwidth, worldheight, Phaser.CANVAS, 'gamediv');

// add gamestates
game.state.add('Boot', BootState);
game.state.add('preload', PreloadState);
game.state.add('1', Level1);
//game.state.add('win', Finish);
//game.state.add('endgame', EndGame);
//game.state.add('menu', Menu);

//load the boot state and start the game
game.state.start('Boot');