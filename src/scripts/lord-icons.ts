import { defineElement } from '@lordicon/element';

// Register the <lord-icon> custom element once. v2 bundles its own optimized
// player (@lordicon/web), so no lottie loader is needed. Hover triggering and
// the ancestor `target` selector are handled by the element itself.
defineElement();
