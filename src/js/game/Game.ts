import { GameObject } from "../engine/GameObject";
import { Animation } from "../engine/Animation";
import { Camera } from "../engine/Camera";
import { Vector } from "../engine/Vector";
import { Dimension } from "../engine/Dimension";
import { Sprite, SpriteBuilder } from "../engine/Sprite";
import { Asset } from "../engine/Asset";
import { Engine } from "../engine/Engine";
import { Loader } from "../engine/Loader";

import { Control } from "./Control";
import { Player } from "./Player";
import { CollisionManager } from "../engine/CollisionManager";


export class Game {

    private _engine: Engine;
    private _loader: Loader;

    constructor() {
        this._engine = new Engine();
        this._loader = new Loader();

        const camera = new Camera(
            new Vector(0, 0),
            new Dimension(500, 500),
        );
        this._engine.add(camera);

        const playerAsset = new Asset(
            "character.png",
            new Dimension(96, 128),
        );
        this._loader.add(playerAsset);

        const playerAnimation = new Animation(
            new SpriteBuilder(playerAsset).columns(3).rows(1).dim(new Dimension(32, 32)).build(),
            [1, 0, 1, 2],
            120,
        )

        const player: Player = new Player(
            playerAnimation,
            // new Sprite(
            //     playerAsset,
            //     1, 0,
            //     new Dimension(32, 32),
            //     // 0, 3, 0, 4,
            //     // [1, 0, 1, 2]
            // ),
            new Vector(250, 250),
            new Dimension(32, 32),
            true,
            null,
            0.1,
            camera,
        );
        this._engine.add(player);
        new Control(player);

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
        this._engine.add(tree);

        const collisionManager = new CollisionManager(this._engine.gameObjects);
        player.collisionManger = collisionManager;
    }

    run() {
        this._engine.start(this._loader);
    }

}