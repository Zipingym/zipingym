import App from './core/app';

const root = document.getElementById('app')!;
const app = new App(root, {
  debugUI: true,
  production: __ISPRODUCTION__,
});
declare global {
  const __ISPRODUCTION__: boolean;
}
