"use client";

import "phaser";
import { Player } from "./types";
import { User } from "@/server/types";

class TechiesFirstScene extends Phaser.Scene {
  constructor() {
    super();
    this.players = {};
  }
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  controls!: any;
  player!: Player;
  borderLayer!: Phaser.Tilemaps.TilemapLayer;
  tileset!: Phaser.Tilemaps.Tileset;
  bg!: Phaser.GameObjects.TileSprite;
  map!: Phaser.Tilemaps.Tilemap;
  cam!: Phaser.Cameras.Scene2D.Camera;
  gameTick: number = 1;

  players: { [key: string]: Player };
  [k: string]: any;

  preload() {
    this.load.image("bg", "/assets/bg/snow.png");
    this.load.image("Wall-Brick_03-64x64", "/assets/tiles/Wall-Brick_03-64x64.png");
    this.load.tilemapTiledJSON("map1", "/assets/maps/map1.json");
    this.load.spritesheet("vikingHammerMan", "/assets/characters/base.png", { frameWidth: 160, frameHeight: 160 });
    this.load.spritesheet("demonKnight", "/assets/characters/base.png", { frameWidth: 160, frameHeight: 160, startFrame: 1 });
  }

  createPlayerSprite(character: string = "vikingHammerMan") {
    const sprite = this.physics.add.sprite(200, 100, character);
    sprite.body.setSize(120, 130);
    sprite.body.setOffset(15, 15);
    sprite.setDisplaySize(80, 80);

    // Movement
    sprite.setMaxVelocity(1000, 1200);
    sprite.body.setDragX(800);

    this.physics.add.collider(sprite, this.borderLayer);

    return sprite;
  }

  create() {
    this.bg = this.add.tileSprite(-200, -100, 1920, 1080, "bg").setScale(1.2).setOrigin(0, 0);
    this.bg.setScrollFactor(0.4);
    this.map = this.make.tilemap({ key: "map1", tileWidth: 64, tileHeight: 64 });
    this.tileset = this.map.addTilesetImage("Wall-Brick_03-64x64") as Phaser.Tilemaps.Tileset;
    this.borderLayer = this.map.createLayer("border", this.tileset) as Phaser.Tilemaps.TilemapLayer;
    this.borderLayer.setCollisionBetween(0, 46);
    const socket = (globalThis as any).gameSocket;

    socket?.emit("loadPlayers", ({ character, username }: User) => {
      this.player = { username, sprite: this.createPlayerSprite(character) };
      this.cam = this.cameras.main;
      this.cam.startFollow(this.player.sprite);
    });

    socket?.on("updatePlayers", (backendPlayers: { [k: string]: { socketId: string } & User }) => {
      for (const key in backendPlayers) {
        const player = backendPlayers[key];
        if (socket?.id === player.socketId) continue;

        if (this.players[key] === undefined) {
          const sprite = this.createPlayerSprite(player.character);
          this.players[key] = { sprite, ...player };
        }
      }
      for (const key in this.players) {
        if (!backendPlayers[key]) {
          this.players[key].sprite.destroy();
          delete this.players[key];
        }
      }
    });

    socket?.on("gameStateChange", (roomState: any) => {
      for (const key in this.players) {
        const player = this.players[key];
        if (player) {
          player.sprite.x = roomState[key].x;
          player.sprite.y = roomState[key].y;
        }
      }
    });

    this.cursors = (this.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin).createCursorKeys();
    this.controls = this.input.keyboard?.addKeys("W,A,S,D");

    // Movement
    this.controls.W.on(
      "down",
      () => {
        if (this.player.sprite.body.blocked.down) {
          this.player.sprite.setVelocityY(-800);
        }
      },
      this
    );

    // DEBUG
    // this.borderLayer.renderDebug(this.add.graphics().setAlpha(0.7), {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(255, 0, 0, 100), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(0, 255, 0, 255), // Color of colliding face edges
    // });
  }

  update() {
    const socket = (globalThis as any).gameSocket;

    if (this.player) {
      socket?.emit("location", { x: this.player.sprite.x, y: this.player.sprite.y });
    }
    this.gameTick++;

    // Movement
    if (this.controls.A.isDown) {
      this.player.sprite.setVelocityX(-400);
    } else if (this.controls.D.isDown) {
      this.player.sprite.setVelocityX(400);
    }
  }
}

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  width: 600,
  height: 400,

  backgroundColor: "#303030",
  antialias: true,
  physics: {
    default: "arcade",

    arcade: {
      tileBias: 64,
      gravity: { y: 1200, x: 0 },
    },
  },
  scene: TechiesFirstScene,
};
