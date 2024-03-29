import {
  Color4,
  DirectionalLight,
  HemisphericLight,
  Scene,
  TransformNode,
  Vector3,
} from '@babylonjs/core';
import UpdateLoop from './UpdateLoop';
import Config from '../../global/config/Config';
import BuildEngine from './build/engine';

export default class Core {
  private static instance: Core;
  private parent: HTMLElement;
  //@ts-expect-error
  private _scene: Scene;

  public static RootName = '@root';

  private constructor(parent: HTMLElement) {
    this.parent = parent;
  }

  private async init() {
    this._scene = new Scene(await BuildEngine.build());
    this.parent.appendChild(this.scene.getEngine().getRenderingCanvas()!);

    if (Config.get.debugUI) {
      await import('@babylonjs/inspector');
      this.scene.debugLayer.show({
        overlay: false,
      });
    } else {
      this.scene.debugLayer.hide();
    }
    this.scene.clearColor = new Color4(0.2, 0.5, 0.7, 1);
    this.scene.getEngine().setHardwareScalingLevel(1 / window.devicePixelRatio);
    this.scene.addTransformNode(new TransformNode(Core.RootName));
  }

  public static async set(parent: HTMLElement) {
    if (this.instance == null) {
      this.instance = new Core(parent);
      await this.instance.init();
      UpdateLoop.set();
    }
  }

  public static run() {
    this.instance.scene.getEngine().runRenderLoop(() => {
      UpdateLoop.get.update();
    });
  }

  public static get get() {
    return this.instance;
  }

  public get scene(): Scene {
    return this._scene!;
  }

  public get root(): TransformNode {
    return this.scene.getNodeByName(Core.RootName)! as TransformNode;
  }
}
