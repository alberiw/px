import { GameObject } from "../engine/GameObject";
import { Animation } from "../engine/Animation";
import { Vector } from "../engine/Vector";
import { Dimension } from "../engine/Dimension";
import { Sprite, SpriteBuilder } from "../engine/Sprite";
import { Asset } from "../engine/Asset";
import { Engine } from "../engine/Engine";
import { Loader } from "../engine/Loader";
import { CollisionManager } from "../engine/CollisionManager";
import { StateMachine } from "../engine/Animator";
import { TileMap } from "../engine/TileMap";

import { Player } from "./Player";

export class Game {

    private _engine: Engine;
    private _loader: Loader;

    constructor() {
        this._engine = new Engine();
        this._loader = new Loader();

        const playerAsset = new Asset(
            "character.png",
            new Dimension(96, 128),
        );
        this._loader.add(playerAsset);

        //default
        const playerSprite = new Sprite(
            playerAsset,
            1, 0,
            new Dimension(32, 32),
        )

        //dawn
        const playerAnimation1 = new Animation(
            new SpriteBuilder(playerAsset).firstColumn(0).columns(3).firstRow(0).rows(1).dim(new Dimension(32, 32)).build(),
            [1, 0, 1, 2],
            120,
        )

        //left
        const playerAnimation2 = new Animation(
            new SpriteBuilder(playerAsset).firstColumn(0).columns(3).firstRow(1).rows(1).dim(new Dimension(32, 32)).build(),
            [1, 0, 1, 2],
            120,
        )

        //right
        const playerAnimation3 = new Animation(
            new SpriteBuilder(playerAsset).firstColumn(0).columns(3).firstRow(2).rows(1).dim(new Dimension(32, 32)).build(),
            [1, 0, 1, 2],
            120,
        )

        //up
        const playerAnimation4 = new Animation(
            new SpriteBuilder(playerAsset).firstColumn(0).columns(3).firstRow(3).rows(1).dim(new Dimension(32, 32)).build(),
            [1, 0, 1, 2],
            120,
        )

        const animator = new StateMachine(playerSprite);
        animator.addState(playerAnimation1);
        animator.addState(playerAnimation2);
        animator.addState(playerAnimation3);
        animator.addState(playerAnimation4);
        animator.addTransition([e => e.get("y") > 0, playerAnimation1]);
        animator.addTransition([e => e.get("x") < 0, playerAnimation2]);
        animator.addTransition([e => e.get("x") > 0, playerAnimation3]);
        animator.addTransition([e => e.get("y") < 0, playerAnimation4]);

        const player: Player = new Player(
            animator,
            new Vector(250, 250),
            new Dimension(32, 32),
            0.1,
        );
        this._engine.addGameObject(player);

        const treeAsset = new Asset(
            "tree.png",
            new Dimension(32, 64),
            // new Dimension(36, 72),
        );
        this._loader.add(treeAsset);

        const tree: GameObject = new GameObject(
            new Sprite(treeAsset),
            new Vector(100, 100),
            new Dimension(32, 64),
        )
        this._engine.addGameObject(tree);

        const collisionManager = new CollisionManager(this._engine.gameObjects);
        player.collisionManger = collisionManager;

        const template = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ]
        const tilesAsset = new Asset(
            "tiles.gif",
            new Dimension(288, 288),
        );
        this._loader.add(tilesAsset);
        const tileMap = new TileMap(
            tilesAsset,
            new Dimension(16, 16),
            template,
        );
        this._engine.addTileMap(tileMap);
    }

    run() {
        this._engine.start(this._loader);
    }

}