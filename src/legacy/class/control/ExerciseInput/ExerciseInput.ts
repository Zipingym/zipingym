import CharacterControl, { direction } from '../CharacterControl';
import CharacterInput from '../CharacterInput';
import ExerciseClassfierPipeline from './pipeline';
import Bzmodel from './model';
import classfier from './classfier';
import { test as wasmPreprocesser } from './wasm/pkg/wasm';
import model from '$static/tflite/work.tflite';
import '@tensorflow/tfjs-backend-webgl';

export default class ExerciseInput implements CharacterInput {
  private move: CharacterControl;
  private inputVideo: HTMLVideoElement;
  private pipeline: (video: HTMLVideoElement) => Promise<Array<number>>;
  constructor(
    inputVideo: HTMLVideoElement,
    frameRate: number = 30,
    keyMap?: Map<string, direction>
  ) {
    this.inputVideo = inputVideo;
    Promise.all([Bzmodel(), classfier(model)]).then(([bzmodel, classfier]) => {
      this.pipeline = ExerciseClassfierPipeline(
        bzmodel,
        //@ts-ignore
        wasmPreprocesser,
        classfier
      );
      setInterval(this.update.bind(this), 1000 / frameRate);
    });
  }
  private update() {
    this.pipeline(this.inputVideo)
      .then((res: Array<number>) => {
        let maxIdx: number = -1;
        let maxVal: number = -1;
        for (let i = 0; i < res.length; i++) {
          if (res[i] > maxVal) {
            maxIdx = i;
            maxVal = res[i];
          }
        }
        console.log(maxIdx);
      })
      .catch(() => {});
  }
  setMove = (move: CharacterControl) => {
    this.move = move;
  };
}