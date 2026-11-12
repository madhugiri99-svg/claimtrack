import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

/** Starts the mock API. Runs in every build, since this demo has no real backend. */
export function startMockApi() {
  return worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    quiet: true,
  });
}
