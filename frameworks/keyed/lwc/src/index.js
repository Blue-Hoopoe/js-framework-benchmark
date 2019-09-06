import { buildCustomElementConstructor } from '@lwc/engine';
import App from './lwc/app/app';

window.customElements.define('main-element', buildCustomElementConstructor(App));
