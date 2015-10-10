//some variables
var level = 1;  //change this to start in a different level
var levels = 7;  // 0, 1, 2 ,3, 4 ,5, 6  Don't forget to change this! (and add the state)
var player_health = 1;  //lowest level is 1  - don't set to 3 without a gun (fireflower)
var weapon_selected = 'sword';  //fireflower, sword
var player_chain = false; 
var player_lives = 3;
var player_keys = 2;
var player_lives_reset = 3;
var player_speed = 300;
var air_friction = 300;
var score = 0;
var fireRate = 200;
var gamestate = 'running';
var playerstate = 'idle';
var savepointX = 0;
var savepointY = 0;
var saved = false;

var AIText;

var worldwidth = 800;
var worldheight = 480;

var music;
var map;
var sword;
var gun1;
var weaponangle;
var bullet;
var tileset;
var finishline;
var cursors;
var player = null;
var playershape;
var fireballs;
var enemies;
var nextFire = 0;
var jumptimer = 0;
var jumpHeightCounter = 0;
var jumpspeedx = 0;  // this is for jumping of a chain
var timer = 0;
var invincibleTimer = 0;

var buttongroup;
var left = false;
var right = false;
var fire = false;
var anchorfire = false;
var jump = false;   
var duck = false;
var climb = false;

var hitboxchanged = false;
var climbing = false;
var hanging = false;
var onAir = false;  //stores if player is on ground or in the air

var hangTimer = 0;
var chainElement;
var timerEvents = [];

// anchor vars
var chainAnchor,wallAnchor,lastElement,anchorgroup;

var gameObjects;
var textObjects;
var controls;

var sensor;
var sensorX;
var sensorY;
var sensorexists = false;
var sensorAngle;

var constraints = [];
var accelerate = false;
var docked = false;

var chainMaxLength = 550;
var flightDistance = 0;
var sensorDistance = 0;
var chainSectionCount = 0;
var chainMaxSections = 20;
var chainLength = 0;
var formerMouse = -1;
var playerChainRC =false;
var objectAbove = false;