import { browser } from '$app/environment';

if (browser) {
  const { default: BridgeButtonController } = await import('./bridge-button-controller');
  const stimulus = (window as any).__stimulus__;
  stimulus.register('bridge-button', BridgeButtonController);
}
