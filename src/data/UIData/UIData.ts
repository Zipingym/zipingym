import UICore from '$/core/UICore/UICore';
import { NormalizedLandmarkList } from '@mediapipe/pose';

export default class UIData {
  constructor(private core: UICore) {}

  private time: number = 0;
  public get getTime() {
    return this.time;
  }
  public addTime(time: number) {
    this.time += time;
    this.core.drawTime(this.getTime);
  }
  public setLandmarks(
    landmarks: NormalizedLandmarkList,
    info: { name: string; color: string }
  ) {
    this.core.drawSkeleton(landmarks, info);
  }
}