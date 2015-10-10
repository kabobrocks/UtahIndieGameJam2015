//================================================================================
// CREATE USER INTERFACE
//================================================================================   
function createUI (currentState) {
    
        coin = game.add.sprite(game.camera.width / 2, 32, 'ui', 0)
        coin.fixedToCamera = true;
        coin.anchor.setTo(0.5, 0.5);
        //textObjects.add(coin);
    
        scoreText = game.add.text(game.camera.width / 2 + 20, 26, ' x ' + score, { fill: '#ececec', font: '16px Arial' });
        scoreText.fixedToCamera = true; 
        scoreText.x = game.camera.width - scoreText.width / 2;
        textObjects.add(scoreText);
        
        for (i = 1; i <= player_lives; i++) {
            heart = game.add.sprite(50 * i, 32, 'lifesaver');
            heart.anchor.setTo(0.5, 0.5);
            heart.fixedToCamera = true;
            textObjects.add(heart);
        }
    
}

function createDoorKeyUI (currentState) {
    doorKeyObjects = game.add.group();

    for (i = 1; i <= player_keys; i++) {
        console.log("keys!" + i)
        doorKey = game.add.sprite(40 * i, 90, 'doorkey');
        doorKey.anchor.setTo(0.5, 0.5);
        doorKey.fixedToCamera = true;
        doorKeyObjects.add(doorKey);
    }

}

//================================================================================
// CREATE OBJECTS
//================================================================================
function createObjects(currentState){
	//empty for now, need to fill when we add new objects, such as coins, powerups, keys, etc.
	createUI(currentState);
    createDoorKeyUI(currentState);

    // doors = game.add.group();
    // map.createFromObjects('objects', 150, 'door', 1, true, false, doors); //questionmark  (99 eckunten rechts)
    // doors.forEach(DoorIt, this);
    // gameObjects.add(doors);

    coins = game.add.group();
    map.createFromObjects('objects', 150, 'questionmark', 1, true, false, coins); //questionmark  (99 eckunten rechts)
    coins.forEach(ApplyQuestionSprite, this);
    gameObjects.add(coins);
}

function DoorIt(door){
    // game.physics.p2.enable(questionmark);
    // questionmark.body.y += 32;  //since we are replacing a 32x32 tile with a 64x64 object we need to adjust
    // questionmark.body.static=true;
    // questionmark.body.sprite.name='coin';
    // questionmark.body.setCollisionGroup(questionmarkCG);
    // questionmark.body.collides([playerCG,fireballCG,powerupsCG]);
    // questionmark.body.setMaterial(groundMaterial);
    console.log("Door!");
}

function ApplyQuestionSprite(questionmark){
    game.physics.p2.enable(questionmark);
    questionmark.body.y += 32;  //since we are replacing a 32x32 tile with a 64x64 object we need to adjust
    questionmark.body.static=true;
    questionmark.body.sprite.name='coin';
    questionmark.body.setCollisionGroup(questionmarkCG);
    questionmark.body.collides([playerCG,fireballCG,powerupsCG]);
    questionmark.body.setMaterial(groundMaterial);
}

function hitQuestionmark(player,questionmark) {
    if (player_keys > 0) {
        player_keys--;
        console.log(player_keys);
        doorKeyObjects.destroy();
        questionmark.sprite.kill();
        createDoorKeyUI();
    }
}

//================================================================================
// CREATE CHAINS
//================================================================================
function createChainElement(chainSection, chainLength) {
    if(docked == true) {
    	return;
    }
    var x = player.body.x;
    var y = player.body.y;
    var height = 20;  //height for the physics body - your image height is 8px
    var width = 16;   //this is the width for the physics body.. if to small the rectangles will get scrambled together
    var maxForce = 100000;  //the force that holds the rectangles together
    if (chainSection == 0) { // first chainSection
        newElement = anchorgroup.create(x, y, 'chain',3);
        game.physics.p2.enable(newElement, false);
        newElement.body.setRectangle(width, height);
        newElement.body.angle = sensorAngle + 90;  //+90
        newElement.body.mass = chainLength;
        newElement.body.angularDamping = 1;
        newElement.body.data.gravityScale = 0;
        newElement.body.data.shapes[0].sensor = false;
        newElement.body.setCollisionGroup(fireballCG);
        newElement.body.collides([groundCG]);
        newElement.body.createGroupCallback(groundCG, anchorCollision, this);
        chainAnchor = newElement;
        accelerate = true; 
    }
    else{
        newElement = anchorgroup.create(x, y, 'chain', 1); 
        newElement.scale.setTo(0.6, 1);
        game.physics.p2.enable(newElement, false);
        newElement.body.setRectangle(width, height);
        newElement.body.angle = sensorAngle + 90;
        newElement.body.mass = chainLength / chainSectionCount;  // this reduces the mass of every new ropeelement (it stops the rope from beeing pulled apart but it introduces other obstacles) 
        newElement.body.data.gravityScale = 0;
        newElement.body.data.shapes[0].sensor = true;
        chainAnchor = newElement;
            
    }
    if (chainSectionCount % 2 == 1) {
    	lastElement.bringToTop();
    }
    if (lastElement) { 
    	constraints.push(game.physics.p2.createRevoluteConstraint(newElement, [0, -8], lastElement, [0, 8], maxForce));
    }  
    if (chainSection == chainLength) { // if lastRopeSection > anchor Player
        constraints.push(game.physics.p2.createRevoluteConstraint( newElement, [0, 8], player, [0, 8], maxForce)); 
        docked = true;
    }
    lastElement = newElement;
    player.bringToTop();
    layerforeground.bringToTop(); 
    chainSectionCount++;
}
