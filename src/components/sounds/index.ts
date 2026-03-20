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
  onload?: (type: PreloadType) => void;
};

type PreloadType = 'onStart' | 'onGame';

export default class Sounds {
  public track: Record<
    string,
    {
      src: string[];
      loop: boolean;
      onload: boolean;
      track: Howl | null;
      preloadType: PreloadType;
    }
  > = {
    bgm: { src: [bgm], loop: true, onload: false, track: null, preloadType: 'onGame' },
    yiqi: { src: [yiqi], loop: false, onload: false, track: null, preloadType: 'onGame' },
    chi: { src: [chi], loop: false, onload: false, track: null, preloadType: 'onGame' },
    hao: { src: [hao], loop: false, onload: false, track: null, preloadType: 'onGame' },
    click: { src: [click], loop: false, onload: false, track: null, preloadType: 'onStart' },
    button: { src: [button], loop: false, onload: false, track: null, preloadType: 'onGame' },
    miss: { src: [miss], loop: false, onload: false, track: null, preloadType: 'onGame' },
    levelup: { src: [levelup], loop: false, onload: false, track: null, preloadType: 'onGame' },
    success: { src: [success], loop: false, onload: false, track: null, preloadType: 'onGame' },
    correct: { src: [correct], loop: false, onload: false, track: null, preloadType: 'onStart' },
    incorrect: {
      src: [incorrect],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onStart',
    },
  };

  private onload: (type: PreloadType) => void;

  constructor(props: SoundTrackProps) {
    this.onload = props.onload || (() => {});
    this.preload('onStart');
  }

  preload(type: PreloadType, onload?: (type: PreloadType) => void) {
    const isLoadedBefore = Object.values(this.track)
      .filter((value) => value.preloadType === type)
      .every((value) => value.onload);
    if (isLoadedBefore) return;

    Object.entries(this.track)
      .filter((track) => track[1].preloadType === type)
      .forEach(([key, value]) => {
        this.track[key].track = new Howl({
          src: value.src,
          loop: value.loop,
          onload: () => {
            value.onload = true;
            this.checkIsLoaded();
            if (type === 'onGame' && onload) onload(type);
          },
        });
      });
  }

  checkIsLoaded() {
    const isOnStartLoaded = Object.values(this.track)
      .filter((value) => value.preloadType === 'onStart')
      .every((value) => value.onload);
    if (isOnStartLoaded) {
      this.onload('onStart');
    }
    const isOnGameLoaded = Object.values(this.track)
      .filter((value) => value.preloadType === 'onGame')
      .every((value) => value.onload);
    if (isOnGameLoaded) {
      this.onload('onGame');
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
