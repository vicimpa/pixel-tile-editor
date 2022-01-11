import { minMax } from "./math";

interface Layer {
  name: string;
  frames: Uint8Array[];
}

export class Project {
  name: string = 'New project';
  layers: Layer[] = [];

  constructor(public sizeX: number, public sizeY: number) {
    this.sizeX = minMax(sizeX, 1, 256) | 0;
    this.sizeY = minMax(sizeY, 1, 256) | 0;
    this.addLayer('default');
  }

  addLayer(name: string) {
    this.layers.push({ name, frames: [] });
  }

  addFrame(layer: Layer) {
    layer.frames.push(
      new Uint8Array(this.sizeX * this.sizeY)
    );
  }
}
