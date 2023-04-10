import * as poseDetection from '@tensorflow-models/pose-detection';
import {
  BlazePoseMediaPipeModelConfig,
  BlazePoseMediaPipeEstimationConfig,
} from '@tensorflow-models/pose-detection';
import { Vector3Array } from './landmark';

const PoseModel = (
  config?: BlazePoseMediaPipeModelConfig,
  estimate?: BlazePoseMediaPipeEstimationConfig
): Promise<(video: HTMLVideoElement) => Promise<Vector3Array>> => {
  return new Promise((resolve, reject) => {
    poseDetection
      .createDetector(poseDetection.SupportedModels.BlazePose, {
        runtime: 'mediapipe',
        modelType: 'full',
        solutionPath: './mp/',
        ...config,
      })
      .then((detecter) => {
        resolve((video: HTMLVideoElement, now: number = performance.now()) => {
          return new Promise((res, rej) => {
            detecter
              .estimatePoses(video, estimate, now)
              .then((result) => {
                if (result.length >= 1 && result[0].keypoints3D != undefined) {
                  //@ts-ignore
                  res(result[0].keypoints3D);
                } else {
                  reject();
                }
              })
              .catch(console.log);
          });
        });
      });
  });
};
export default PoseModel;