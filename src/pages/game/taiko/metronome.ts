import EnterFrame from 'lesca-enterframe';
import { TaikoInitInterval, TaikoLevelChangeInterval, TaikoMinGap } from './config';

type Props = {
  onFire: () => void;
  onLevelUp?: () => void;
};

export default class Metronome {
  private interval = TaikoInitInterval;
  private minInterval = TaikoMinGap;
  private index = 0;
  private levelIndex = 0;

  private onFire: () => void;
  private onLevelUp?: () => void;

  constructor(props: Props) {
    this.onFire = props.onFire;
    this.onLevelUp = props.onLevelUp;
  }

  public tick(delta: number) {
    const idx = Math.floor(delta / this.interval);
    if (idx !== this.index) {
      this.index = idx;
      this.onFire();
      const levelChangeCount = this.interval < 500 ? 20 : 10;
      if (this.index === levelChangeCount) {
        this.levelUp();
        EnterFrame.reset();
        this.index = 0;
        this.levelIndex += 1;
      }
    }
  }

  public levelUp() {
    this.interval = Math.max(this.minInterval, this.interval - TaikoLevelChangeInterval);
    this.onLevelUp?.();
  }
}
