import { Howl } from 'howler';
// 添加 Howler 全局音頻解鎖
import './mobile-audio-unlock';
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
import heyLong1 from './mp3/heyLong1.mp3';
import heyLong2 from './mp3/heyLong2.mp3';
import { SoundName } from './type';

type SoundTrackProps = {
  onload?: (type: PreloadType) => void;
  onError?: (message: string) => void;
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
    heyLong1: {
      src: [heyLong1],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onListening',
    },
    heyLong2: {
      src: [heyLong2],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onListening',
    },
  };

  private onload: (type: PreloadType) => void;
  private onError: (message: string) => void;

  constructor(props: SoundTrackProps) {
    this.onload = props.onload || (() => {});
    this.onError = props.onError || (() => {});

    this.preload('onStart');
    this.initMobileSupport();
  }

  private initMobileSupport(): void {
    // 等待用戶交互以解鎖音頻
    const events = ['touchstart', 'click', 'tap', 'keydown'];
    const unlock = () => {
      this.unlockAllTracks();
      events.forEach((event) => {
        document.removeEventListener(event, unlock, { capture: true });
      });
    };

    events.forEach((event) => {
      document.addEventListener(event, unlock, { capture: true, once: true });
    });

    // 處理頁面可見性變化
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        setTimeout(() => this.restoreAudio(), 300);
      }
    });
  }

  private unlockAllTracks(): void {
    // 為每個已載入的音軌播放極短的靜音來解鎖
    Object.values(this.track).forEach((trackInfo) => {
      if (trackInfo.track && trackInfo.onload) {
        try {
          const currentVolume = trackInfo.track.volume();
          trackInfo.track.volume(0);
          trackInfo.track.play();
          setTimeout(() => {
            trackInfo.track?.stop();
            trackInfo.track?.volume(currentVolume);
          }, 1);
        } catch {
          this.onError('音頻解鎖失敗');
        }
      }
    });
  }

  private restoreAudio(): void {
    // 重新初始化可能失效的音軌
    Object.entries(this.track).forEach(([name, trackInfo]) => {
      if (trackInfo.track && trackInfo.onload) {
        // 檢查音軌是否還能正常工作
        const testVolume = trackInfo.track.volume();
        try {
          trackInfo.track.volume(testVolume);
        } catch {
          // 如果出錯，重新創建音軌
          // console.log(`重新創建音軌: ${name}`);
          this.recreateTrack(name);
        }
      }
    });
  }

  private recreateTrack(name: string): void {
    const trackInfo = this.track[name];
    if (!trackInfo) return;

    // 停止並清理舊的音軌
    if (trackInfo.track) {
      try {
        trackInfo.track.stop();
        trackInfo.track.unload();
      } catch {
        this.onError(`清理音軌 ${name} 失敗`);
      }
    }

    // 創建新的音軌
    trackInfo.track = new Howl({
      src: trackInfo.src,
      loop: trackInfo.loop,
      html5: false, // 在移動設備上，Web Audio API 通常更穩定
      preload: true,
      onload: () => {
        trackInfo.onload = true;
        // console.log(`音軌 ${name} 重新載入完成`);
      },
      onloaderror: () => {
        this.onError(`音軌 ${name} 重新載入失敗`);
      },
    });
  }

  preload(type: PreloadType, onload?: (type: PreloadType) => void) {
    this.onload = onload || this.onload;

    const isLoadedBefore = Object.values(this.track)
      .filter((value) => value.preloadType === type)
      .every((value) => value.onload);

    if (isLoadedBefore) {
      this.checkIsLoaded(type);
      return;
    }

    Object.entries(this.track)
      .filter((track) => track[1].preloadType === type)
      .forEach(([key, value]) => {
        this.track[key].track = new Howl({
          src: value.src,
          loop: value.loop,
          onload: () => {
            value.onload = true;
            this.checkIsLoaded(type);
          },
        });
      });
  }

  checkIsLoaded(type: PreloadType) {
    if (type === 'onStart') {
      const isOnStartLoaded = Object.values(this.track)
        .filter((value) => value.preloadType === 'onStart')
        .every((value) => value.onload);
      if (isOnStartLoaded) {
        this.onload('onStart');
      }
    }

    if (type === 'onGame') {
      const isOnGameLoaded = Object.values(this.track)
        .filter((value) => value.preloadType === 'onGame')
        .every((value) => value.onload);
      if (isOnGameLoaded) {
        this.onload('onGame');
      }
    }

    if (type === 'onListening') {
      const isOnListeningLoaded =
        Object.values(this.track)
          .filter((value) => value.preloadType === 'onListening')
          .filter((value) => value.onload).length >= 3;
      if (isOnListeningLoaded) {
        this.onload('onListening');
      }
    }
  }

  preloadByName(name: string[], preload: PreloadType, onload?: (type: PreloadType) => void) {
    this.onload = onload || this.onload;
    name.forEach((n) => {
      if (this.track[n] && !this.track[n].onload) {
        this.track[n].track = new Howl({
          src: this.track[n].src,
          loop: this.track[n].loop,
          html5: true,
          onload: () => {
            this.track[n].onload = true;
            if (onload) onload(preload);
          },
          onloaderror: () => {
            this.onError(`音軌 ${n} 重新載入失敗`);
          },
        });
      }
    });
  }

  play(name: SoundName, volume = 1, canPlayTwice = true) {
    const trackInfo = this.track[name];

    if (!trackInfo || !trackInfo.onload || !trackInfo.track) {
      this.onError(`音頻 ${name} 尚未載入或不存在`);
      return;
    }

    const track = trackInfo.track;

    if (!canPlayTwice && track.playing()) {
      this.onError(`音頻 ${name} 已在播放中，無法重複播放`);
      return;
    }

    try {
      // 設定音量並播放
      track.volume(volume);
      track.play();
    } catch {
      this.onError(`播放音頻 ${name} 失敗，嘗試重新創建`);
      // 如果播放失敗，嘗試重新創建音軌
      this.recreateTrack(name);

      // 重新嘗試播放
      setTimeout(() => {
        if (this.track[name].track) {
          try {
            this.track[name].track!.volume(volume);
            this.track[name].track!.play();
          } catch (retryError) {
            this.onError(`重試播放 ${name} 也失敗: ${retryError}`);
          }
        }
      }, 100);
    }
  }

  stop(name: SoundName) {
    if (this.track[name] && this.track[name].onload && this.track[name].track) {
      this.track[name].track!.stop();
    }
  }

  // 檢查音頻狀態的方法
  public checkAudioStatus(): { available: boolean; context: string } {
    const sampleTrack = Object.values(this.track).find((track) => track.track);
    if (!sampleTrack || !sampleTrack.track) {
      return { available: false, context: 'no_tracks' };
    }

    const ctx = (sampleTrack.track as any)._context;
    return {
      available: !document.hidden && ctx?.state !== 'suspended',
      context: ctx?.state || 'unknown',
    };
  }
}
