// Synthesized Ambient Soundscape using Web Audio API
// No external MP3 files required; respects user preferences and autoplay policies.

class AmbientSoundManager {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;
  private listeners: ((playing: boolean) => void)[] = [];

  constructor() {
    // Lazy initialized on first user interaction
  }

  private initAudio() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      // AudioContext not supported
    }
  }

  public subscribe(fn: (playing: boolean) => void) {
    this.listeners.push(fn);
    fn(this.isPlaying);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  public start() {
    if (this.isPlaying) return;
    this.initAudio();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      // Master Gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      // Soft fade in to 0.05 max volume (subtle, non-intrusive cinematic hum)
      this.gainNode.gain.exponentialRampToValueAtTime(0.045, this.ctx.currentTime + 2.5);

      // Lowpass Filter for moody, underwater/spatial resonance
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(220, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

      // Oscillator 1: Root Tone A1 (55 Hz)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(55.0, this.ctx.currentTime);

      // Oscillator 2: Harmonic Fifth E2 (82.4 Hz) with subtle detune
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(82.4, this.ctx.currentTime);
      this.osc2.detune.setValueAtTime(4, this.ctx.currentTime); // 4 cents detune for chorus warmth

      // Connect graph: [Osc1, Osc2] -> Filter -> MasterGain -> Destination
      this.osc1.connect(this.filter);
      this.osc2.connect(this.filter);
      this.filter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.osc1.start();
      this.osc2.start();

      this.isPlaying = true;
      this.notify();
    } catch {
      this.isPlaying = false;
      this.notify();
    }
  }

  public stop() {
    if (!this.isPlaying || !this.gainNode || !this.ctx) {
      this.isPlaying = false;
      this.notify();
      return;
    }

    try {
      // Soft fade out
      const fadeTime = 0.8;
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + fadeTime);

      setTimeout(() => {
        try {
          this.osc1?.stop();
          this.osc2?.stop();
          this.osc1?.disconnect();
          this.osc2?.disconnect();
        } catch {
          // Ignore
        }
        this.osc1 = null;
        this.osc2 = null;
        this.isPlaying = false;
        this.notify();
      }, fadeTime * 1000);
    } catch {
      this.isPlaying = false;
      this.notify();
    }
  }

  // Play subtle feedback chime for interactive clicks
  public playChime(freq = 520) {
    this.initAudio();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch {
      // Silent fail
    }
  }
}

export const ambientSound = new AmbientSoundManager();
