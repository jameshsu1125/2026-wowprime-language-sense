import { Howl } from 'howler';
import bgm from './mp3/bgm.mp3';
import yiqi from './mp3/yiqi.mp3';
import chi from './mp3/chi.mp3';
import hao from './mp3/hao.mp3';
import click from './mp3/click.mp3';
import button from './mp3/button.mp3';
import miss from './mp3/miss.mp3';
import levelup from './mp3/levelup.mp3';
import success from './mp3/success.mp3';
import correct from './mp3/correct.mp3';
import incorrect from './mp3/incorrect.mp3';

export type SoundName =
  | 'bgm'
  | 'yiqi'
  | 'chi'
  | 'hao'
  | 'click'
  | 'button'
  | 'miss'
  | 'levelup'
  | 'success'
  | 'correct'
  | 'incorrect';

type SoundTrackProps = {
  onload?: () => void;
};

export default class Sounds {
  public track: Record<
    string,
    { src: string[]; loop: boolean; onload: boolean; track: Howl | null }
  > = {
    bgm: { src: [bgm], loop: true, onload: false, track: null },
    yiqi: { src: [yiqi], loop: false, onload: false, track: null },
    chi: { src: [chi], loop: false, onload: false, track: null },
    hao: { src: [hao], loop: false, onload: false, track: null },
    click: { src: [click], loop: false, onload: false, track: null },
    button: { src: [button], loop: false, onload: false, track: null },
    miss: { src: [miss], loop: false, onload: false, track: null },
    levelup: { src: [levelup], loop: false, onload: false, track: null },
    success: { src: [success], loop: false, onload: false, track: null },
    correct: { src: [correct], loop: false, onload: false, track: null },
    incorrect: { src: [incorrect], loop: false, onload: false, track: null },
  };

  private onload: () => void;

  constructor(props: SoundTrackProps) {
    this.onload = props.onload || (() => {});
    Object.keys(this.track).forEach((key) => {
      this.track[key].track = new Howl({
        src: this.track[key].src,
        loop: this.track[key].loop,
        onload: () => {
          this.track[key]!.onload = true;
          this.checkIsLoaded();
        },
      });
    });
  }

  checkIsLoaded() {
    const isLoaded = Object.keys(this.track).every((key) => this.track[key].onload);
    if (isLoaded) {
      this.onload();
    }
  }

  play(name: SoundName, volume = 1) {
    if (this.track[name] && this.track[name].onload && this.track[name].track) {
      this.track[name].track!.volume(volume);
      this.track[name].track!.play();
    }
  }

  stop(name: SoundName) {
    if (this.track[name] && this.track[name].onload && this.track[name].track) {
      this.track[name].track!.stop();
    }
  }
}
