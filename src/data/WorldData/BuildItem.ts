import RoadCalculator from './RoadCalculator';
import Random from '$/util/Random';
import { ItemInfo } from './WorldData';

export default class BuildItem {
  private static ItemRank: Map<number, number> = new Map([
    [RoadCalculator.RoadLength / 2, 1],
    [0, 1],
    [RoadCalculator.RoadLength / 2, 1],
  ]);

  private static ItemRow: Map<number, number> = new Map([
    [RoadCalculator.RoadWidth / 2, 1],
    [0, 1],
    [RoadCalculator.RoadWidth, 1],
  ]);

  private static ItemCount: Map<number, number> = new Map([
    [0, 1],
    [1, 2],
    [2, 1],
  ]);

  public static buildItems(length: number): Array<Array<ItemInfo>> {
    const result: Array<Array<ItemInfo>> = new Array();
    for (let i = 0; i < length; i++) {
      const itemCount = Random.getRandom(this.ItemCount);
      console.log(itemCount);
      const positions = Random.getRandoms(this.ItemRank, itemCount);
      const one: Array<ItemInfo> = new Array();
      positions.forEach((rank: number) => {
        one.push({
          rank,
          row: Random.getRandom(this.ItemRow),
          name: 'banana',
        });
      });
      result.push(one);
    }

    return result;
  }
}
