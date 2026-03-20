import { Howl } from 'howler';
import bgm from './mp3/bgm.mp3';
import button from './mp3/button.mp3';
import chi from './mp3/chi.mp3';
import click from './mp3/click.mp3';
import correct from './mp3/correct.mp3';
import hao from './mp3/hao.mp3';
import incorrect from './mp3/incorrect.mp3';
import levelup from './mp3/levelup.mp3';
import miss from './mp3/miss.mp3';
import sound1 from './mp3/sound1.mp3';
import sound10 from './mp3/sound10.mp3';
import sound11 from './mp3/sound11.mp3';
import sound12 from './mp3/sound12.mp3';
import sound13 from './mp3/sound13.mp3';
import sound14 from './mp3/sound14.mp3';
import sound15 from './mp3/sound15.mp3';
import sound16 from './mp3/sound16.mp3';
import sound17 from './mp3/sound17.mp3';
import sound18 from './mp3/sound18.mp3';
import sound19 from './mp3/sound19.mp3';
import sound2 from './mp3/sound2.mp3';
import sound20 from './mp3/sound20.mp3';
import sound21 from './mp3/sound21.mp3';
import sound22 from './mp3/sound22.mp3';
import sound23 from './mp3/sound23.mp3';
import sound3 from './mp3/sound3.mp3';
import sound4 from './mp3/sound4.mp3';
import sound5 from './mp3/sound5.mp3';
import sound6 from './mp3/sound6.mp3';
import sound7 from './mp3/sound7.mp3';
import sound8 from './mp3/sound8.mp3';
import sound9 from './mp3/sound9.mp3';
import success from './mp3/success.mp3';
import yiqi from './mp3/yiqi.mp3';
import { SoundName } from './type';

type SoundTrackProps = {
  onload?: (type: PreloadType) => void;
};

type PreloadType = 'onStart' | 'onGame' | 'onListening';

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
    sound1: { src: [sound1], loop: false, onload: false, track: null, preloadType: 'onListening' },
    sound2: { src: [sound2], loop: false, onload: false, track: null, preloadType: 'onListening' },
    sound3: { src: [sound3], loop: false, onload: false, track: null, preloadType: 'onListening' },
    sound4: { src: [sound4], loop: false, onload: false, track: null, preloadType: 'onListening' },
    sound5: { src: [sound5], loop: false, onload: false, track: null, preloadType: 'onListening' },
    sound6: { src: [sound6], loop: false, onload: false, track: null, preloadType: 'onListening' },
    sound7: { src: [sound7], loop: false, onload: false, track: null, preloadType: 'onListening' },
    sound8: { src: [sound8], loop: false, onload: false, track: null, preloadType: 'onListening' },
    sound9: { src: [sound9], loop: false, onload: false, track: null, preloadType: 'onListening' },
    sound10: {
      src: [sound10],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onListening',
    },
    sound11: {
      src: [sound11],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onListening',
    },
    sound12: {
      src: [sound12],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onListening',
    },
    sound13: {
      src: [sound13],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onListening',
    },
    sound14: {
      src: [sound14],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onListening',
    },
    sound15: {
      src: [sound15],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onListening',
    },
    sound16: {
      src: [sound16],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onListening',
    },
    sound17: {
      src: [sound17],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onListening',
    },
    sound18: {
      src: [sound18],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onListening',
    },
    sound19: {
      src: [sound19],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onListening',
    },
    sound20: {
      src: [sound20],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onListening',
    },
    sound21: {
      src: [sound21],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onListening',
    },
    sound22: {
      src: [sound22],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onListening',
    },
    sound23: {
      src: [sound23],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onListening',
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

    this.onload = onload || this.onload;

    Object.entries(this.track)
      .filter((track) => track[1].preloadType === type)
      .forEach(([key, value]) => {
        this.track[key].track = new Howl({
          src: value.src,
          loop: value.loop,
          onload: () => {
            value.onload = true;
            this.checkIsLoaded();
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

    const isOnListeningLoaded =
      Object.values(this.track)
        .filter((value) => value.preloadType === 'onListening')
        .filter((value) => value.onload).length >= 3;
    if (isOnListeningLoaded) {
      this.onload('onListening');
    }
  }

  preloadByName(name: string[], preload: PreloadType, onload?: (type: PreloadType) => void) {
    this.onload = onload || this.onload;
    name.forEach((n) => {
      if (this.track[n] && !this.track[n].onload) {
        this.track[n].track = new Howl({
          src: this.track[n].src,
          loop: this.track[n].loop,
          onload: () => {
            this.track[n].onload = true;
            if (onload) onload(preload);
          },
        });
      }
    });
  }

  play(name: SoundName, volume = 1, canPlayTwice = true) {
    if (this.track[name] && this.track[name].onload && this.track[name].track) {
      if (!canPlayTwice && this.track[name].track!.playing()) return;
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
