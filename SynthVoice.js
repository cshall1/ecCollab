function SynthVoice () {
  var osc = new p5.Oscillator();
  osc.setType('sine');
  osc.amp(0.0);

  let attackTime = 0.2; // seconds
  let decayTime = 0.2; // seconds
  let susPercent = 0.3; // percent
  let releaseTime = 1.0; // seconds
  var env = new p5.Envelope();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(1.0, 0.0);

  osc.start();

  this.env = env;
  this.osc = osc;
  
  // if the voice has been triggered, it is playing
  this.playing = false;

  this.freq = function (inFreq) {
    this.osc.freq(inFreq);
  };

  this.amp = function (inAmp) {
    this.env.setRange(inAmp, 0.0);
  };

  this.triggerAttack = function() {
    this.playing = true;
    this.env.triggerAttack(this.osc);
  };
  this.triggerAttackIfNotPlaying = function() {
    if (!this.playing) {
      this.triggerAttack();
    }
  };
  this.triggerRelease = function() {
    this.playing = false;
    this.env.triggerRelease(this.osc);
  };
}
