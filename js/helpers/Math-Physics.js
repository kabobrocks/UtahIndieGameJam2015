//================================================================================
// PHYSICS
//================================================================================

function setupPhysics() {
	//start physics system and enable "expensive" collision events
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.setImpactEvents(true);

	//defaultRestitution is not available method in phaser docs, artifact of old version of phaser
	game.physics.defaultRestitution = 0 ;
	game.physics.p2.gravity.y = 1400; //how much does gravity effect the items in the level
	game.world.enableBodySleeping=true;  //allow bodies to not get calculated when there is nothing to do
	game.stage.smoothed = false;  //no antialiasing

	//define materials
	groundMaterial = game.physics.p2.createMaterial('ground');
	playerMaterial = game.physics.p2.createMaterial('player');

	//define what happens when one material contacts the other
	game.physics.p2.createContactMaterial(playerMaterial, groundMaterial, { friction: 2, restitution: 0 });

	//define collisiongroups
	playerCG = game.physics.p2.createCollisionGroup();
	groundCG = game.physics.p2.createCollisionGroup();
	levelEndCG = game.physics.p2.createCollisionGroup(); //need to add the rules for it in Objects.js
	questionmarkCG = game.physics.p2.createCollisionGroup();
	computerAICG = game.physics.p2.createCollisionGroup(); //the scary pirate ghost guys
	keyCG = game.physics.p2.createCollisionGroup(); //keys that you can pick up
	secretWallCG = game.physics.p2.createCollisionGroup(); //wall to be destroyed if you know all secrets
	goalCG = game.physics.p2.createCollisionGroup(); // the normal goal
	secretGoalCG = game.physics.p2.createCollisionGroup(); //the secret goal
	playerCG = game.physics.p2.createCollisionGroup();
    enemyAirCG = game.physics.p2.createCollisionGroup();
    enemyGroundCG = game.physics.p2.createCollisionGroup();
    enemyStaticCG = game.physics.p2.createCollisionGroup();
    enemyboundsCG = game.physics.p2.createCollisionGroup();
    groundCG = game.physics.p2.createCollisionGroup();
    platformCG = game.physics.p2.createCollisionGroup();
    fireballCG = game.physics.p2.createCollisionGroup();
    questionmarkCG = game.physics.p2.createCollisionGroup();
    powerupsCG = game.physics.p2.createCollisionGroup();
    finishlineCG = game.physics.p2.createCollisionGroup();

	//prevent rightclick contextmenu
	game.canvas.oncontextmenu = function (e) {	e.preventDefault();	};
}

//================================================================================
// COLLISION DETECTION RATE
//================================================================================

function shootSensor(buttonanchor){
    if (docked){destroyAnchor();}
    if (sensorexists || chainAnchor || !player_chain ){return}  //don't fire twice

    sensor = anchorgroup.create(player.x, player.y, 'anchor',3);
    game.physics.p2.enable(sensor,false);
    sensor.body.data.gravityScale=0;
    sensor.body.setCollisionGroup(fireballCG);
    sensor.body.collides([groundCG,questionmarkCG,enemyAirCG,enemyGroundCG]);
    sensor.body.createGroupCallback(groundCG, sensorCollision, this);
    sensor.body.createGroupCallback(questionmarkCG, sensorCollision, this);
    sensor.alpha=0.5;
    if(buttonanchor){
        circlebuttonAngle = angleBetween(buttonanchor, game.input);
        sensorAngle=Math.degrees(circlebuttonAngle);
        sensor.body.angle=sensorAngle;
        sensor.body.velocity.x = Math.cos(circlebuttonAngle) * 2000;
        sensor.body.velocity.y = Math.sin(circlebuttonAngle) * 2000;
    }
    else {
        sensorAngle = Math.atan2(game.camera.y+game.input.y - player.y, game.camera.x+game.input.x - player.x);
        sensorAngle=Math.degrees(sensorAngle);
        sensor.body.angle=sensorAngle;
        moveToPointer(sensor,2000);  //object, speed
    }
}

function sensorCollision(thissensor,ground){
    if (sensorexists == true) {return} else {  sensorexists=true;}  //this is important because otherwise the collision callback would be fired more than once
    sensorX = thissensor.x;
    sensorY = thissensor.y;
    if (thissensor) { thissensor.sprite.kill();}
    if (sensor) {sensor.kill();}

    wallAnchor = anchorgroup.create(sensorX, sensorY, 'anchor',3);   //duplicate the sensor and use this one for the constraint.. this is neccesary because the rotated and fast-shot "sensor" is not good for precise constraints - it's physics body properties seem to be way off
    game.physics.p2.enable(wallAnchor,false);
    wallAnchor.body.setCollisionGroup(groundCG);
    wallAnchor.body.collides([fireballCG]);
    wallAnchor.body.static=true;
    wallAnchor.alpha=0;
    sensorDistance = distanceBetweenPoints([player.body.x,player.body.y],[sensorX,sensorY])  //point [x,y], point [x,y]
    chainLength = Math.round(sensorDistance / 19);
    if (chainLength != 0){  createChainElement(0, chainLength); } // create first chainelement the chainAnchor
    else {destroyAnchor();}
}

function destroyAnchor(){
	chainSectionCount = 0;
	accelerate = false;  
	docked = false;
	sensorexists = false;
	chainAnchor = false;
	lastElement = false;
	clearConstraints();
	anchorgroup.destroy(true,true);  //destroy children, dont destroy group
}

function clearConstraints(){
	for (i=0; i<=constraints.length; i++){ game.physics.p2.removeConstraint(constraints[i]); }
	constraints = []; 
}

//================================================================================
// MATH / P2
//================================================================================

function touchingUp(someone) { //is an item touching the top of your object
    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;
    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];
        if (c.bodyA === someone.data || c.bodyB === someone.data) {
            var d = p2.vec2.dot(c.normalA, yAxis); //Normal dot Y-axis
            if (c.bodyA === someone.data) d *= -1;
            if (d < -0.5) result = true;
        }
    } 
    return result;
}

function touchingDown(someone) { //is an item touching the bottom of your object
    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;
    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];
        if (c.bodyA === someone.data || c.bodyB === someone.data) {
            var d = p2.vec2.dot(c.normalA, yAxis); //Normal dot Y-axis
            if (c.bodyA === someone.data) d *= -1;
            if (d > 0.5) result = true;
        }
    } 
    return result;
}

function touchingLeft(someone) { //is an item touching the left of your object
    var xAxis = p2.vec2.fromValues(1, 0);
    var result = false;
    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];
        if (c.bodyA === someone.data || c.bodyB === someone.data) {
            var d = p2.vec2.dot(c.normalA, xAxis); // Normal dot Y-axis
            if (c.bodyA === someone.data) d *= -1;
            if (d < -0.5) result = true;
        }
    } 
    return result;
}

function touchingRight(someone) { //is an item touching the right of your object
    var xAxis = p2.vec2.fromValues(1, 0);
    var result = false;
    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];
        if (c.bodyA === someone.data || c.bodyB === someone.data)        {
            var d = p2.vec2.dot(c.normalA, xAxis); // Normal dot Y-axis
            if (c.bodyA === someone.data) d *= -1;
            if (d > 0.5) result = true;
        }
    } 
    return result;
}

function moveToPoint(obj1,point,speed) {
    var angle = Math.atan2(point[1] - obj1.y, point[0] - obj1.x);
    obj1.body.velocity.x = Math.cos(angle) * speed;
    obj1.body.velocity.y = Math.sin(angle) * speed;
}
//================================================================================
// CHECK-ABOVE
//================================================================================

// checks if there is something else above the player except his own sword
function checkAbove(){
    if (game.physics.p2.hitTest({x: player.body.x, y: player.body.y-26}).length != 0){ //check if there is something above
        var hitObjects = game.physics.p2.hitTest({x: player.body.x, y: player.body.y-26});
        if (hitObjects.length > 1 && !hitObjects[1].parent.sprite) {
        	return true;
        } else {
            if (hitObjects[0] && !hitObjects[0].parent.sprite) {
            	return true;
            } else {
            	return false;
            }
        }
    }
}