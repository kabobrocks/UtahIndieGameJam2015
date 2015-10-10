//================================================================================
// PLAYER
//================================================================================

function setupPlayer(playerX, playerY) {
    if (player_health == 3) { //change the sprite if you are at full health
        player = game.add.sprite(playerX, playerY, 'pirate'); 
    }
    else { //normal sprite 
        player = game.add.sprite(playerX, playerY, 'pirate');
    }
    game.physics.p2.enable(player, false); 
    player.health = player_health;
    player.name = 'pirate';
    player.chain = player_chain;
    player.body.fixedRotation = true; 
    playershape = player.body.setCircle(29,0,4);

    player.body.data.gravityScale = 1;
    player.body.allowSleep = true; 
    player.body.setCollisionGroup(playerCG);
    player.body.setMaterial(playerMaterial);
    player.body.collides([groundCG, levelEndCG, questionmarkCG, computerAICG]); //what is the player going to interact with
    player.body.createGroupCallback(questionmarkCG, hitQuestionmark);
    player.body.createGroupCallback(computerAICG, interactWithNPC);
    //player.body.createGroupCallback(levelEndCG, finishLevel); //when the player interacts with a collision group, what happens?

    setupPlayerLooks(player);
    
    game.camera.follow(player);  //self explanatory

    anchorgroup = game.add.group();

    //createWeapon(weapon_selected);
    gameObjects.add(player);
}

//================================================================================
// SET PLAYER ANIMATIONS AND LOOKS
//================================================================================
function setupPlayerLooks(player, color){
    if (color) { //set color of the sprite if it is set
        player.loadTexture(color,5);
    }

    player.animations.add('walk', [0], 1, true);
    player.animations.add('duckwalk', [0], 1, true);
    player.animations.add('climb', [0], 1, true);
}

function playerAnimations(player) {
    //set custom animations when we have a sprite sheet made
}

//================================================================================
// PLAYER MOVEMENTS / ACTIONS
//================================================================================

function resetInputs() {
    fire = false;
    left = false;
    right = false;
    duck = false;
    climb = false;
    jump = false;
}

function playerInputActions(){

    if (climbing == true) {
        player.body.setZeroVelocity();
        // Sets directions for climbing, checking if you are still in a climbable area
        if (cursors.left.isDown && !cursors.down.isDown  || left && !duck){   //  Move to the left
            player.scale.x = -1;
            player.body.moveLeft(player_speed);
            playerstate = 'climb';
            if (!map.getTileWorldXY(player.body.x, player.body.y,32,32, layerropes)){
                player.body.data.gravityScale = 1; 
                climbing = false;
            }
        } else if (cursors.right.isDown && !cursors.down.isDown || right && !duck) {//  Move to the right
            player.scale.x = 1;
            player.body.moveRight(player_speed);
            playerstate = 'climb';
            if (!map.getTileWorldXY(player.body.x, player.body.y,32,32, layerropes)){
                player.body.data.gravityScale = 1; 
                climbing = false;
            }
        } else if (cursors.down.isDown && !cursors.left.isDown && !cursors.right.isDown || duck && !left && !right){
            player.body.moveDown(player_speed);
            playerstate='climb';
            if (!map.getTileWorldXY(player.body.x, player.body.y,32,32, layerropes)){
                player.body.data.gravityScale = 1; 
                climbing = false;
            }
        } else if (cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown || climb && !left && !right){
            if (map.getTileWorldXY(player.body.x, player.body.y-16,32,32, layerropes)){  //only climb if there is something to grab 1 tile ahead (never climb higher than the tree)
                player.body.moveUp(150);
                playerstate = 'climb';
            }else { 
                playerstate = 'hang';     //otherwise hang tight
            }
        } else { 
            playerstate = 'hang';
        }

        if ((fire && !duck) && player_health == 3) { playerstate = 'fire';}
        if (jumpKey.isDown || jump) {playerstate = 'jump';}  //release rope
        if (game.input.currentPointers == 0 && !game.input.activePointer.isMouse) { 
            resetInputs();
        } //this works around a "bug" where a button gets stuck in pressed state
    }
    
    else if (hanging === true) {
        playerstate = 'hang';
        if ((cursors.right.isDown && !jumpKey.isDown) || (right && !jump)) {
            chainElement.body.data.force[0] =- 200; //move the chain - swing
        } else if ((cursors.left.isDown && !jumpKey.isDown) || (left && !jump)) {  
             chainElement.body.data.force[0] = 200;
        } else if (jumpKey.isDown || jump){ playerstate = 'jump'; }//release chain //other jump related events are handled in the jump_now function
    } else if (docked === true) {
        playerstate = 'hang';
        if ((cursors.right.isDown && !jumpKey.isDown) || (right && !jump)) {
            player.body.data.force[0] =- 200; //move the chain - swing
        } else if ((cursors.left.isDown && !jumpKey.isDown)|| (left && !jump) ){  
             player.body.data.force[0] = 200;
        } else if (jumpKey.isDown || jump){ playerstate = 'jump';}//release chain //other jump related events are handled in the jump_now function
    }
    // NORMAL GAMEPLAY
    else {

        if (hitboxchanged === true){ //control player shape and speed according to its health
            hitboxchanged = false; 
            if (player.health >= 2 && (cursors.down.isDown || duck)) { 
                playershape.radius = game.physics.p2.pxm(15);
                player_speed = 150;
            } else if (player.health >= 2 && !(jumpKey.isDown || jump) && checkAbove() && !(cursors.down.isDown || duck)) {
                playershape.radius = game.physics.p2.pxm(15);
                player_speed = 150;
            } else if (player.health >= 2 && !(cursors.down.isDown || duck)) { 
                playershape.radius = game.physics.p2.pxm(20);
                player_speed = 300;
                air_friction = 400;
            } else {  
                playershape.radius = game.physics.p2.pxm(15);
                player_speed = 250; 
                air_friction = 300;
            } 
        } else if (cursors.left.isDown && !cursors.down.isDown  || left && !duck) { //Move to the left
            player.scale.x = -1;
            playerstate = 'walk';
            if (onAir == false) {
                player.body.moveLeft(player_speed);
            } else {
                player.body.moveLeft(jumpspeedx); 
                player.body.data.force[0] = -air_friction;
            }
        } else if (cursors.right.isDown && !cursors.down.isDown || right && !duck) { //Move to the right
            player.scale.x = 1;
            playerstate = 'walk';
            if (onAir == false) {
                player.body.moveRight(player_speed);
            } else {
                player.body.moveRight(jumpspeedx);
                player.body.data.force[0] = air_friction;
            }     
        } else if (cursors.down.isDown && cursors.left.isDown || left && duck) { //Duck and go left
            hitboxchanged = true; 
            if (player.health >= 2) {
                playerstate = 'duckwalk';
            } else {
                playerstate = 'walk';
            } //only play duck animation if player is big and can duck otherwise just walk
            player.scale.x = -1;
            player.body.moveLeft(player_speed);
        } else if (cursors.down.isDown && cursors.right.isDown || right && duck) { //Duck and go right
            hitboxchanged = true; 
            if (player.health >= 2){
                playerstate = 'duckwalk';
            } else {
                playerstate = 'walk';
            } //only play duck animation if player is big and can duck
            player.scale.x = 1;
            player.body.moveRight(player_speed);
        } else if (cursors.down.isDown && !cursors.left.isDown && !cursors.right.isDown || duck && !left && !right) { //No moving, more ducking!
            hitboxchanged = true;
            if (player.health >= 2) {
                playerstate = 'duck';
            } else {
                playerstate = 'idle';
            } 
        } else if ((cursors.up.isDown && !cursors.down.isDown || climb && !duck) && map.getTileWorldXY(player.body.x, player.body.y,32,32, layerropes)) { //On a climbing area? Climb!
            climbing = true;
            player.body.data.gravityScale = 0;
            player.body.moveUp(150);
            player.body.velocity.x = 0;
            playerstate = 'climb';
            destroyAnchor();
        } else { //Just stand there
            playerstate = 'idle';
            // honestly let us delete this
            if ((onAir == true) && (player.body.velocity.x > 5)) { //blowing wind if idle
                player.body.data.force[0] = -40;
            }  //moarr air friction when doing nothing in air
            if ((onAir == true) && (player.body.velocity.x < -5)) { player.body.data.force[0] = 40;}
        }

        if ((fire && !duck) && player_health == 3) { 
            playerstate = 'fire'; 
        }
        if (jumpKey.isDown || jump) { 
            playerstate = 'jump'; 
            if (docked) {
                destroyAnchor(); 
            }
        } 
        if (player.body.y >= game.world.height + 100) { //fall down through the bottom of the game world, die
            playerDie(player.body);
        }

        if (game.input.currentPointers == 0 && !game.input.activePointer.isMouse) {
            resetInputs();
        }

        //on air material should change to ice.. do not stick to anything!
        if (onAir === true) {
            player.body.setMaterial(iceMaterial);
        } else if (onAir === false) {
            player.body.setMaterial(playerMaterial);
            jumpspeedx = player_speed;
        }
     
        // could be in separate function since it has nothing to do with player controls
        
        //anchor movement and logic only when chain is available 
        if (player_chain) {
            if (accelerate) {
                moveToPoint(chainAnchor, [sensorX, sensorY], 4500); 
            }

            if (sensor) {
                flightDistance = distanceBetween(player, sensor);
                if (flightDistance > chainMaxLength) {
                    destroyAnchor();
                }
            }
            if (!docked && chainAnchor) {
                if (chainSectionCount >= chainMaxSections) {
                    destroyAnchor();
                } else {
                    createChainElement(chainSectionCount, chainLength);
                    createChainElement(chainSectionCount, chainLength);
                } // slow down chainelement creation..  every second frame create a new element 
            }   
        }
    }   
}

function playerDie(player, enemy) {  //this gets a phaser.physics.body  so no further .body needed.. to acces sprite write .sprite
    gamestate = 'lost';
    player_lives -= 1;
    player_health = 1;
    player_chain = false;

    player.clearCollision(true, true);  //no collision with anything anymore
    music.pause();
    player.sprite.bringToTop(); 
    game.sound.play('lose', 0.3);  // key, volume
    player.moveUp(300);
    player.collideWorldBounds = false; // can fall out of game world
    timerEvents[1] = game.time.events.add(Phaser.Timer.SECOND * 2, rebootLevel, this);
}