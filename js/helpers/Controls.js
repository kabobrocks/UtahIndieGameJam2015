//================================================================================
// CONTROLS
//================================================================================

function setupControls() {
	//input elements
	cursors = {
		up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
		left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
		down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
		right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
	}

	jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	jumpKey.onDown.add(jump_now, this);  //only jump once per press

	acceptKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
	acceptKey.onDown.add(interact_now, this);

	quitKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
	quitKey.onDown.add(quit_now, this);
}

//================================================================================
// JUMPING
//================================================================================

var jumpspeedx = 0;

function jump_now() {
	console.log("jump!");
	if (gamestate == 'postGame') {
		game.state.start(1, true, false);
		return;
	}

	destroyAnchor();

	if (climbing === true ) { //get out of climb mode
		game.sound.play('jump', .1);
		player.body.moveUp(500);
		player.body.data.gravityScale = 1; //give the player gravity again, as it is no longer on the climbable object
		climbing = false;
		jumpHeightCounter = 0;
	} else if (hanging === true) { //get out of hanging mode
		jumpHeightCounter = 0;
		jumpspeedx = Math.abs(chainElement.body.velocity.x * 30) + 200;
		hanging = false;
		if (playerChainRC) { //remove the chain constraint and allow to jump onto another
			game.physics.p2.removeConstraint(playerChainRC);
		}
		player.body.data.gravityScale = 1;
		hangTimer = game.time.now + 500;
		player.body.velocity.x= chainElement.body.velocity.x * -30;
		player.body.velocity.y = -300; //start falling
	} else { //just a normal jump doing jumping things
		if (touchingDown(player.body)){ //if the player is touching the ground
			game.sound.play('jump', .1);
			player.body.moveUp(575);
			jumpHeightCounter = 1;
		} else if (jumpHeightCounter == 1) { //oh you want to double jump?
			game.sound.play('jump', .1);
			player.body.moveUp(475);
			jumpHeightCounter = 0; //no more jumps available
		}
	}
}

function interact_now() {
	if (AIText != null) {
		AIText.kill();
		AIText = null;
	}

	if (doneText != null) {
		doneText.kill();
		doneText = null;
	}
}

function quit_now() {
	if (doneText != null) {
		music.pause();
		game.state.start('win');
	}
}

function testInput() {
	console.log("you got here!");
	secretWalls.destroy();
}