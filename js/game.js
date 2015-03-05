
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
		//global variables that we can use throughout the game
		enemyBaseHealth: 10,
		playerBaseHealth: 10,
		enemyCreepHealth: 10,
		playerHealth: 10,
		enemyCreepAttack: 1,
		playerAttack: 1,
		//orcBaseDamage: 10,
		//orcBaseHealth: 100,
		//orcBaseSpeed: 3,
		//orcBaseDefense: 0,
		playerAttackTimer: 1000,
		enemyCreepAttackTimer: 1000,
		playerMoveSpeed: 5,
		creepMoveSpeed: 5,
		gameTimerManager:"",
		herodeathmanager: "",
		player:"",
		exp: 0,
		gold: 0,
		exp1: 0,
		exp2: 0,
		exp3: 0,
		exp4: 0,
		win: ""

	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}
	// creates a safe engine with these variables
	me.save.add({exp: 0, exp1: 0, exp2: 0, exp3: 0, exp4: 0});

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
		// registers the character entitie into the game
		me.pool.register("player", game.PlayerEntity, true);
		//registers the player base from melon js into the game
		me.pool.register("PlayerBase", game.PlayerBaseEntity, true);
		// registers the enemy base from melon js to the game
		me.pool.register("EnemyBase", game.EnemyBaseEntity, true);
		//loads the creep character
		me.pool.register("EnemyCreep", game.EnemyCreep, true);

		me.pool.register("Player2", game.Player2, true);
		// registers the timer into the game
		me.pool.register("GameTimerManager", game.GameTimerManager);
		//adds herodeathmanager into the game
		me.pool.register("HeroDeathManager", game.HeroDeathManager);
		//adds expierence manager into the game
		me.pool.register("ExpierenceManager", game.ExpierenceManager);


		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());

		// Start the game.
		me.state.change(me.state.MENU );
	}
};

