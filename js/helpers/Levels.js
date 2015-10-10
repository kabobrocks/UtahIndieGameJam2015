//================================================================================
// LEVEL LAYERS
//================================================================================

function setupLayers(layerObjectsMaterial, mainLayerMaterial) {
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
    layerBackground = map.createLayer('background');

	//add to game objects
	gameObjects.add(layerBackground);
	gameObjects.add(layerForeground);
	gameObjects.add(layerDoors);

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