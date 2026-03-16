import EnterFrame from 'lesca-enterframe';

type Props = {
  onFire: () => void;
  onLevelUp?: () => void;
};

export default class Metronome {
  private interval = 1000;
  private index = 0;

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
      if (this.index === 10) {
        this.levelUp();
        EnterFrame.reset();
        this.index = 0;
      }
    }
  }

  public levelUp() {
    this.interval = Math.max(100, this.interval - 100);
    this.onLevelUp?.();
  }
}
