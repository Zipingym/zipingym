import Core from './Core';
import colaTheme from '$static/model/stage1_5.glb';
import userGLB from '$static/model/girl.glb';
import itemAssets from '$static/model/item.glb';
import WorldCoreImpl from './WorldCore/WorldCoreImpl';
import { RoadMeshs } from './WorldCore/WorldCore';
import { AssetContainer } from '@babylonjs/core';
import AssetContainerLoader from '$/util/loader/AssetContainerLoader';

import '@babylonjs/loaders/glTF/2.0';
import ItemCore, { ItemMeshs } from './WorldCore/ItemCore';

export default class LoadCore extends Core {
  public roadMeshs?: RoadMeshs;
  public itemsMeshs?: ItemMeshs;
  public humanMeshs?: AssetContainer;
  public static async set(parent: HTMLElement): Promise<LoadCore> {
    const core = new LoadCore();
    await core.init(parent);
    return core;
  }
  protected async init(parent: HTMLElement) {
    await super.init(parent);
    this.roadMeshs = await WorldCoreImpl.load([colaTheme], this.scene);
    this.itemsMeshs = await ItemCore.load(itemAssets, this.scene);
    this.humanMeshs = await AssetContainerLoader.load(userGLB, this.scene);
  }
}
