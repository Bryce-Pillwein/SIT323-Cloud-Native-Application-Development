import type { HealthData, HealthMode } from "~/types/HealthData";
import { getRandom } from "./getRandom";

// — Constants for “normal” drift —
const HR_NORMAL_DELTA = 2;          // bpm per tick
const SPO2_NORMAL_DELTA = 0.1;      // % per tick
const TEMP_NORMAL_DELTA = 0.02;     // °C per tick

// — Emergency ramp parameters —
const EMERGENCY_START_CHANCE = 0.01;  // 1% chance to begin ramp
const EMERG_DURATION = 10;            // seconds of ramp
const EMERG_HR_DELTA = 15;            // bpm per tick during ramp
const EMERG_SPO2_DELTA = 1;           // % per tick during ramp
const EMERG_TEMP_DELTA = 0.1;         // °C per tick during ramp

// — Fall detection parameters —
const FALL_CHANCE = 0.005;            // 0.5% per tick
const FALL_DURATION = 3;              // seconds of “fall” spike
const FALL_ACCELITY_HIGH = 3.5;       // g’s during fall
const FALL_ACCELITY_BASE = 1.0;       // g’s when standing



export class SimulatorElderly {
  private userId: string;
  private last: Required<Pick<HealthData, "heartRate" | "spo2" | "temperature">>;
  private inEmergency = false;
  private emergStep = 0;
  private inFall = false;
  private fallStep = 0;

  constructor(userId: string) {
    this.userId = userId;
    // initialize around normal vitals
    this.last = {
      heartRate: 75,
      spo2: 96,
      temperature: 36.6,
    };
  }

  next(): HealthData {
    const now = new Date().toISOString();

    // 1. Possibly start an emergency ramp
    if (!this.inEmergency && Math.random() < EMERGENCY_START_CHANCE) {
      this.inEmergency = true;
      this.emergStep = 0;
    }

    let mode: HealthMode = "idle";
    let hr = this.last.heartRate;
    let spo2 = this.last.spo2;
    let temp = this.last.temperature;

    if (this.inEmergency) {
      mode = "emergency";
      hr += EMERG_HR_DELTA;
      spo2 -= EMERG_SPO2_DELTA;
      temp += EMERG_TEMP_DELTA;
      this.emergStep++;
      if (this.emergStep >= EMERG_DURATION) {
        // end the event
        this.inEmergency = false;
      }
    } else {
      // normal random walk
      hr += getRandom(-HR_NORMAL_DELTA, HR_NORMAL_DELTA);
      spo2 += getRandom(-SPO2_NORMAL_DELTA, SPO2_NORMAL_DELTA);
      temp += getRandom(-TEMP_NORMAL_DELTA, TEMP_NORMAL_DELTA);
    }

    // clamp to human‐plausible bounds
    hr = Math.max(40, Math.min(250, hr));
    spo2 = Math.max(50, Math.min(100, spo2));
    temp = Math.max(35, Math.min(42, temp));

    this.last = { heartRate: hr, spo2, temperature: temp };

    // 2. Possibly trigger a fall
    if (!this.inFall && Math.random() < FALL_CHANCE) {
      this.inFall = true;
      this.fallStep = 0;
    }
    let accelZ: number;
    if (this.inFall) {
      accelZ = FALL_ACCELITY_HIGH;
      this.fallStep++;
      if (this.fallStep >= FALL_DURATION) {
        this.inFall = false;
      }
    } else {
      accelZ = getRandom(FALL_ACCELITY_BASE - 0.02, FALL_ACCELITY_BASE + 0.02);
    }

    // 3. Build the payload
    const payload: HealthData = {
      userId: this.userId,
      timestamp: now,
      mode,
      heartRate: Math.round(hr),
      spo2: Math.round(spo2),
      temperature: parseFloat(temp.toFixed(1)),
      motion: !this.inFall,
      location: { lat: -37.81 + Math.random() * 0.001, lng: 144.96 + Math.random() * 0.001 },
      accelZ,
      fallDetected: this.inFall,
    };

    return payload;
  }
}
