import { numToRgba } from "library/colors";
import { Component, FC, forwardRef, MouseEventHandler, MutableRefObject, ReactNode, useEffect, useRef } from "react";

import imgTransparent from "../../img/transparency.png";
import styles from "./Colorset.module.sass";

interface IColorset {
  pallete: number[];
}

const colorToBackground = (c: number) => {
  return c ? {
    background: `rgba(${numToRgba(c).join(',')})`
  } : {
    background: `url(${imgTransparent})`
  };
};

export class Colorset extends Component<IColorset> {
  state = {
    currentMaster: 1,
    currentSlave: 0,
  };

  render() {
    const { currentMaster, currentSlave } = this.state;
    const { pallete } = this.props;

    const s1 = colorToBackground(pallete[currentMaster]);
    const s2 = colorToBackground(pallete[currentSlave]);

    const mouseDown = (color: number) => ((e) => {
      e.preventDefault();
      if (e.button)
        this.setState({ ...this.state, currentSlave: color });
      else
        this.setState({ ...this.state, currentMaster: color });
    }) as MouseEventHandler;

    return (
      <div className={styles.colorset}>
        <div className={styles.selected}>
          <span style={s1}></span>
          <span style={s2}></span>
        </div>
        <div className={styles.colors}>
          {pallete.map((e, i) => {
            const s = colorToBackground(e);
            return (
              <span onMouseDown={mouseDown(i)} key={i} style={s} />
            );
          })}
        </div>
      </div>
    );
  }
}