import { FC } from "react";

import styles from "./Preview.module.sass";

interface IPreview {
  url?: string;
}

export const Preview: FC<IPreview> = ({ url = '' }) => {
  return (
    <div className={styles.preview}>
      <img src={url || undefined} width={32} height={32} />
    </div>
  );
};