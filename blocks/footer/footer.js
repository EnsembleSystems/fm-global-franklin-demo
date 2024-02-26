import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// Flag to indicate whether the footer is being loaded or has been loaded
let isFooterLoaded = false;

/**
 * Loads and decorates the footer.
 * @param {Element} block The footer block element.
 */
export default async function decorate(block) {
  // Check if the footer is already loaded or being loaded, then skip further execution
  if (isFooterLoaded) return;

  // Mark as loading (to prevent duplicate calls while awaiting fetch response)
  isFooterLoaded = true;

  const footerMeta = getMetadata('footer');
  block.textContent = '';

  // Load footer fragment
  const footerPath = footerMeta.footer || '/footer';
  const fragment = await loadFragment(footerPath);

  if (fragment) {
    // Decorate footer DOM
    const footer = document.createElement('div');
    while (fragment.firstElementChild) {
      footer.append(fragment.firstElementChild);
    }

    block.append(footer);
  } else {
    // If loading failed for some reason, reset isFooterLoaded to allow retry
    isFooterLoaded = false;
  }
}
