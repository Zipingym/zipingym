import Core from './core';
import dummyCharacter from '$static/model/character.glb';
import { AssetContainer, Mesh } from 'babylonjs';
import { LoadAll } from '$/function/Load';
import * as BABYLON from 'babylonjs';

export default class User extends Core {
  private static CharacterModelFile: Map<string, string> = new Map([
    ['dummy', dummyCharacter],
  ]);
  private userModel: Map<string, AssetContainer>;
  public set: () => Promise<void> = () => {
    return new Promise((resolve, reject) => {
      LoadAll(User.CharacterModelFile, this.scene)
        .then((users) => {
          this.userModel = users;
          const dummyCharacter = this.userModel.get('dummy');
          if (dummyCharacter != undefined) {
            dummyCharacter.addAllToScene();
            resolve();
          } else {
            reject('NO MAP EXIST');
          }
        })
        .catch(reject);
    });
  };

  public setsync = () => {
    const camera = new BABYLON.FollowCamera(
      'user_camera',
      new BABYLON.Vector3(0, 0, 0),
      this.scene
    );
    const dummyCharacter = this.userModel.get('dummy');
    const character = dummyCharacter.getNodes()[0] as Mesh;
    camera.lockedTarget = character;
    const spawnpoint = (this.scene.getNodeByName('SpawnPoint') as Mesh)
      .position;
    character.position.set(spawnpoint.x, spawnpoint.y, spawnpoint.z);
  };
  public loop = (deltaTime: number) => {};
}
