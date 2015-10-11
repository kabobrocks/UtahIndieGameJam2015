// initialize the game
var game = new Phaser.Game(worldwidth, worldheight, Phaser.CANVAS, 'gamediv');

// add gamestates
game.state.add('Boot', BootState);
game.state.add('preload', PreloadState);
game.state.add('1', Level1);
game.state.add('win', WinState);
game.state.add('secret-win', SecretWinState);
game.state.add('gameOver', GameOverState);

//load the boot state and start the game
game.state.start('Boot');