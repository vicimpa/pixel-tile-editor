import { ceil, minMax } from "./math";
import { strSerialize } from "./string";


interface Layer {
  name: string;
  isShow?: boolean;
  frames: Uint8Array[];
}

export class Project {
  name = 'New project';
  layers: Layer[] = [];
  pallete = new Uint8Array(16 * 4);

  constructor(public sizeX: number, public sizeY: number) {
    this.sizeX = minMax(sizeX, 1, 256) | 0;
    this.sizeY = minMax(sizeY, 1, 256) | 0;
    this.addLayer('default');
  }

  addLayer(name: string) {
    const layer = { name, frames: [] };
    this.layers.push(layer);
    this.addFrame(layer);
  }

  addFrame(layer: Layer) {
    layer.frames.push(
      new Uint8Array(ceil(this.sizeX * this.sizeY / 2))
    );
  }

  save() {
    const outPutBuffer: number[] = [
      ...strSerialize('PXE'),
      this.sizeX,
      this.sizeY,
      ...strSerialize(this.name),
      0xFF, 0xFF,
      ...this.pallete,
      this.layers.length & 0xFF,
    ];

    for (const layer of this.layers) {
      const frames = layer.frames.length & 0xFF;

      outPutBuffer.push(
        ...strSerialize(layer.name),
        0xFF, 0xFF, frames
      );

      for (let i = 0; i < frames; i++)
        outPutBuffer.push(...layer.frames[i]);

      outPutBuffer.push(0xFF, 0xFF);
    }

    console.log(outPutBuffer.map(e => `00${e.toString(16)}`.slice(-2)).join(' ').toUpperCase());
  }
}
