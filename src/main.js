window.addEventListener("load", (ev) => {
    var game = new Phaser.Game({
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
            parent: 'game',
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 760,
            height: 760
        },
        audio: {
            disableWebAudio: true
        },
        physics: {
            default: "arcade",
            arcade: {
                gravity: {},
                debug: false
            }
        },

        scene: {
            preload: preload,
            create: create,
            update: update
        }
    });

    function preload() {
        this.load.image('tileset', 'assets/tileset.png');
        this.load.tilemapTiledJSON('map', 'assets/map.json');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 55, frameHeight: 55 });
    }

    function create() {
        const map = this.add.tilemap("map");
        const tileset = map.addTilesetImage("tileset");
        map.createLayer("ground", tileset);
        this.wall = map.createLayer("wall", tileset);
        this.wall.setCollisionByProperty({ coliders: true })

        this.player = this.physics.add.sprite(80, 100, "player");
        this.physics.add.collider(this.player, this.wall);


        this.anims.create({
            key: 'top',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'bottom',
            frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    function update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
            this.player.anims.play('bottom', true);
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
            this.player.anims.play('top', true);
        }
        else
        {
            this.player.setVelocityX(0).setVelocityY(0);
        }
    }
});