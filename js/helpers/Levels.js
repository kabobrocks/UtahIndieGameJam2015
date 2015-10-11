//================================================================================
// LEVEL LAYERS
//================================================================================

function setupLayers(layerObjectsMaterial, mainLayerMaterial) {

	AIText = null;

	if(!layerObjectsMaterial) {
		layerObjectsMaterial = groundMaterial;
	}

	//create the layers, this pulls from the JSON file

    //ropes---------------------------------------------------
    layerropes = map.createLayer('ropes');
    layerropes.visible = false;

    //doors---------------------------------------------------
    layerDoors = map.createLayer('doorlayer');
    layerDoors.visible = false;

	//layer foreground
	layerForeground = map.createLayer('foreground');
	layerForeground.resizeWorld(); //resize the world to be the same size as the foreground layer

	//layer background---------------------------------------------------
    //layerBackground = map.createLayer('background');

	//add to game objects
	//gameObjects.add(layerBackground);
	gameObjects.add(layerForeground);
	gameObjects.add(layerDoors);
	//gameObjects.add(layerPirateAIs);

	//give physics rules to each of our layers
	layerObjects_tiles = game.physics.p2.convertCollisionObjects(map, 'objects');
	layerMain_tiles = game.physics.p2.convertCollisionObjects(map, 'mainlayer');

	for (i = 0; i < layerObjects_tiles.length; i++) {
		layerObjects_tiles[i].setCollisionGroup(groundCG);		  //what kind of group are we assigning this to?
		layerObjects_tiles[i].collides([playerCG, powerupsCG]);   //what items will be colliding with this group?
		layerObjects_tiles[i].setMaterial(layerObjectsMaterial);  //what material is this made of? Important, as it sets friction, among other things.
	}

	for (i = 0; i < layerMain_tiles.length; i++) {
		layerMain_tiles[i].setCollisionGroup(groundCG);
		layerMain_tiles[i].collides([playerCG]);
		layerMain_tiles[i].setMaterial(groundMaterial);
	}
}

function clearTimers() {
    for (i = 0; i <= 2; i++){
        game.time.events.remove(timerEvents[i]);
    }
}

function rebootLevel() {
    clearTimers();

    // maybe some sort of level is unlocked and available for picking at the stage selection screen? -JR 

    //game over  - do not unlock just go back to levelmenu
    if (player_lives == 0) {
    	game.state.start('gameOver', true, false);
    } else { 
    	game.state.start(''+level+'', true, false); 
    }
}



//================================================================================
// LEVEL LAYERS
//================================================================================
function paralaxBackgrounds (prlx1, prlx0) {
    paralax1.x = game.camera.x * prlx1; 
    paralax0.x = game.camera.x * prlx0; 

}

function updateLevel(prlx1, prlx0) {
    paralaxBackgrounds(prlx1, prlx0);
    if (gamestate=='running') { 
        //show frames per second for testing
        playerInputActions();
        //showFrameRate(); 
    } else if (gamestate == 'lost') {
        playerstate = 'die'; 
        player.body.data.gravityScale=1; 
        player.body.collideWorldBounds=false;
    } else if (gamestate == 'win') {
        fadeOut(); 
        playerstate = 'win'; 
        player.body.collideWorldBounds=false;
    }
    playerAnimations(player);
    layerForeground.bringToTop();
}