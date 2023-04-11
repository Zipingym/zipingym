import { Input } from '../Inputable';

import Pipeline, { MpPose, Classfier, JsMiddleware } from 'exercise-input';

import model from './work.tflite';
import '@tensorflow/tfjs-backend-webgl';
import WebcamBuilder from '$/util/Webcam';
import Trigger from './trigger/Trigger';
import DumbleTrigger from './trigger/DumbleTrigger';

export default class ExerciseInput extends Input {
  private inputVideo?: HTMLVideoElement;
  private pipeline?: (video: HTMLVideoElement) => Promise<Array<number>>;
  private trigger: Trigger;
  constructor(inputVideo?: HTMLVideoElement, frameRate: number = 30) {
    super();
    this.trigger = new DumbleTrigger();
    WebcamBuilder(document.getElementById('webcam')! as HTMLVideoElement).then(
      (camera) => {
        camera.width = 360;
        this.inputVideo = camera;
        this.inputVideo.play();
        Promise.all([MpPose(), Classfier(model)])
          .then(([bzmodel, classfier]) => {
            this.pipeline = Pipeline(bzmodel, JsMiddleware.calc, classfier);
            setTimeout(() => {
              setInterval(this.update.bind(this), 1000 / frameRate);
            }, 3000);
          })
          .catch((e) => {});
      }
    );
  }

  private update() {
    this.pipeline!(this.inputVideo!)
      .then((res: Array<number>) => {
        const temp = this.trigger.call(res);
        if (temp != null) {
          this.onInput(temp);
        }
      })
      .catch((err) => {});
  }
}
