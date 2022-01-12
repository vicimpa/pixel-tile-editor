import { numToRgba, rgbaToNum } from "library/colors";
import { event } from "library/events";
import { Component, createRef } from "react";

import { Colorset } from "./components/colorset";
import { Preview } from "./components/preview";
import styles from "./Editor.module.sass";

export class Editor extends Component {
  root = createRef<SVGSVGElement>();
  canvas = createRef<HTMLCanvasElement>();
  colorset = createRef<Colorset>();

  x = 0;
  y = 0;

  width = 32;
  height = 32;
  mirror = true;

  buffer = new Uint8Array(this.width * this.height);

  scale = 10;
  colors = [
    rgbaToNum(0, 0, 0, 0),
    rgbaToNum(0, 0, 0, 255),
    rgbaToNum(255, 0, 0, 255),
    rgbaToNum(255, 0, 255, 255),
    rgbaToNum(0, 0, 255, 255),
    rgbaToNum(0, 255, 0, 255),
    rgbaToNum(255, 255, 0, 255),
    rgbaToNum(255, 255, 255, 255),
    rgbaToNum(0, 0, 0, 0),
    rgbaToNum(0, 0, 0, 255),
    rgbaToNum(255, 0, 0, 255),
    rgbaToNum(255, 0, 255, 255),
    rgbaToNum(0, 0, 255, 255),
    rgbaToNum(0, 255, 0, 255),
    rgbaToNum(255, 255, 0, 255),
    rgbaToNum(255, 255, 255, 255),
  ];

  canvasMove?: { x: number, y: number; sX: number, sY: number; };

  get preview() {
    return this.canvas.current?.toDataURL();
  }

  drawBuffer() {
    const canvas = this.canvas.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const { colors } = this;

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = 'high';

    const data = context.getImageData(0, 0, this.width, this.height);


    for (let i = 0; i < this.buffer.length; i++) {
      const byte = this.buffer[i];
      const [r, g, b, a] = numToRgba(colors[byte]);

      data.data[i * 4] = r;
      data.data[i * 4 + 1] = g;
      data.data[i * 4 + 2] = b;
      data.data[i * 4 + 3] = a;
    }

    context.putImageData(data, 0, 0);
    this.forceUpdate();
  }

  setPixel(x: number, y: number, color: number) {
    const { width, buffer } = this;
    const index = width * y + x;
    buffer[index] = color;

    if (this.mirror) {
      const mx = width - x - 1;
      const index = width * y + mx;
      buffer[index] = color;
    }

    this.drawBuffer();
  }

  @event('contextmenu')
  @event('mousedown')
  mouseDown(e: MouseEvent) {
    e.preventDefault();

    const { target } = e;

    if (e.button == 0 || e.button == 2) {
      const colorset = this.colorset.current;
      if (!colorset) return;
      const { currentMaster, currentSlave } = colorset.state;

      if (target instanceof HTMLCanvasElement) {
        const { offsetX, offsetY } = e;
        const { width, height, offsetWidth, offsetHeight } = target;
        const wX = width / offsetWidth;
        const wY = height / offsetHeight;

        const x = offsetX * wX | 0;
        const y = offsetY * wY | 0;
        this.setPixel(x, y, e.button ? currentSlave : currentMaster);
      }
    }

    if (e.button == 1)
      this.canvasMove = { x: e.x, y: e.y, sX: this.x, sY: this.y };
  }

  @event('wheel')
  wheel(e: WheelEvent) {
    this.scale += e.deltaY * 0.01;

    if (this.scale < 0)
      this.scale = 0;
    this.forceUpdate();
  }

  @event('mousemove')
  mouseMove(e: MouseEvent) {
    e.preventDefault();
    const root = this.root.current;
    if (!root) return;
    const { clientWidth, clientHeight } = root;

    if (this.canvasMove) {
      const { x, y, sX, sY } = this.canvasMove;
      const { x: mX, y: mY } = e;

      const pX = (mX - x) / clientWidth * 100;
      const pY = (mY - y) / clientHeight * 100;

      this.x = sX + (isFinite(pX) ? pX : 0);
      this.y = sY + (isFinite(pY) ? pY : 0);
      this.forceUpdate();
    }
  }

  @event('blur')
  @event('mouseleave', document)
  @event('mouseup')
  mouseUp(e: MouseEvent) {
    e.preventDefault();

    this.canvasMove = undefined;
  }

  componentDidMount() {
    this.drawBuffer();
  }

  render() {
    const { width, height, root, canvas, scale, x, y } = this;
    const [sWidth, sHeight] = [width, height].map(e => e * scale);
    const [cX, cY] = [sWidth, sHeight].map(e => e * .5);
    return (
      <div className={styles.root}>
        <svg ref={root} >
          <foreignObject x={`${50 + x}%`} y={`${50 + y}%`} width={sWidth} height={sHeight} transform={`translate(${-cX}, ${-cY})`}>
            <canvas width={width} height={height} ref={canvas} />
          </foreignObject>
        </svg>
        <div className={styles.sidebar}>
          <Preview url={this.preview} />
          <Colorset ref={this.colorset} pallete={[...this.colors]} />
        </div>
      </div>
    );
  }
}