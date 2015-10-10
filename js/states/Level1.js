//Level1 State
var Level1 = {
	create: function() {
		//reset the state variables
		gamestate = 'running';
		climbing = false;
		hanging = false;

		//load and play the music
		music = game.add.audio('level1', 1, true); //key, volume, loop
		music.play('', 0 ,3, true);

		//load the background
		sky = game.add.tileSprite(0, 0, worldwidth, worldheight, 'bg-level1-sky');
		sky.fixedToCamera = true;
		paralax0 = game.add.tileSprite(50, -20, 6600, 660, 'bg-level1-middle');
		paralax0.fixedToCamera = true;
		
		paralax1 = game.add.tileSprite(0, 0, 6600, 660, 'bg-level1-front');
		paralax1.fixedToCamera = true;


		//create groups
		gameObjects = game.add.group();
		textObjects = game.add.group();
		controls = game.add.group();

		//add the background to the gameObjects group
		gameObjects.add(sky);
		gameObjects.add(paralax0);
		gameObjects.add(paralax1);

		//set up all of the physics
		setupPhysics();

		//initialize tilemap
		map = game.add.tilemap('level1');
		map.addTilesetImage('mariotileset');

		//set up all of the layers
		setupLayers();
		setupControls();
		createObjects();

		//where are we placing the player?
		setupPlayer(150, 500);
	},
	update: function() {
		updateLevel(0.05, 0.1); //these parameters measure the rate at which the paralax backgrounds move
	}
}