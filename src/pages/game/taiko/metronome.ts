type Props = {
  onFire: () => void;
};

export default class Metronome {
  private interval = 1000;
  private index = 0;

  private onFire: () => void;

  constructor(props: Props) {
    this.onFire = props.onFire;
  }

  public tick(delta: number) {
    const idx = Math.floor(delta / this.interval);
    if (idx !== this.index) {
      this.index = idx;
      this.onFire();
    }
  }
}
