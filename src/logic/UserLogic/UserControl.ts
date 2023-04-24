import UserData from '$/data/CharacterData/UserData';
import WorldData from '$/data/WorldData/WorldData';
import { InputMap } from '$/module/input/InputMap';

export default class UserControl {
  public rowSpeed: number = 1.5;
  public rankSpeed: number = 3;

  constructor(protected userData: UserData, protected worldData: WorldData) {}

  public input(input: InputMap) {
    if (input == 'straight') {
      const currentRank = this.userData.currentRank;
      const roadLength = this.worldData.getNodeLength();
      this.userData.move(
        'rank',
        roadLength - currentRank > this.rankSpeed
          ? this.rankSpeed
          : roadLength - currentRank
      );
    } else {
      if (this.userData.currentRank === this.worldData.getNodeLength()) {
        const rotateDirection = input == 'left' ? 'l' : 'r';
        this.userData.rotate(rotateDirection);
        this.worldData.rotate(rotateDirection);
      } else {
        const speed = this.rowSpeed * (input == 'left' ? -1 : 1);
        if (speed != this.userData.currentRow) {
          this.userData.move('row', speed);
        }
      }
    }
  }
}