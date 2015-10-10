//================================================================================
// LEVEL LAYERS
//================================================================================

function setupLayers(layerObjectsMaterial, mainLayerMaterial) {
	if(!layerObjectsMaterial) {
		layerObjectsMaterial = groundMaterial;
	}

	//create the layers, this pulls from the JSON file

	//layer foreground
	layerForeground = map.createLayer('foreground');
	layerForeground.resizeWorld(); //resize the world to be the same size as the foreground layer

	//add to game objects
	gameObjects.add(layerForeground);

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
		layerMain_tiles[i].collides([playerCG, powerupsCG]);
		layerMain_tiles[i].setMaterial(groundMaterial);
	}
}