import { Controller } from '@hotwired/stimulus';

interface BridgeComponent {
  send(event: string, data?: Record<string, unknown>): void;
}

declare global {
  interface Window {
    HotwireNative?: {
      bridge: {
        registerComponent(name: string, controller: unknown): void;
      };
    };
  }
}

export default class BridgeButtonController extends Controller {
  static values = { title: String, component: String };

  declare titleValue:     string;
  declare componentValue: string;

  connect() {
    if (!this.isNative) return;
    // Tell the native side this component is ready
    this.element.setAttribute('data-bridge-ready', 'true');
  }

  send(data: Record<string, unknown> = {}) {
    if (!this.isNative) return;
    // The native app listens for this via the bridge
    window.dispatchEvent(
      new CustomEvent('bridge:message', {
        detail: {
          component: this.componentValue,
          event:     'clicked',
          data:      { title: this.titleValue, ...data },
        },
      })
    );
  }

  get isNative(): boolean {
    return document.documentElement.hasAttribute('data-turbo-native');
  }
}
