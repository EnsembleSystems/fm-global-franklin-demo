import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import { createColorStripe } from './createColorStripe.js';

// Flag to indicate whether the footer is being loaded or has been loaded
let isFooterLoaded = false;

/**
 * Loads and decorates the footer.
 * @param {Element} block The footer block element.
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  block.textContent = '';

  // Load footer fragment
  const footerPath = footerMeta.footer || '/footer';
  const fragment = await loadFragment(footerPath);

  // Decorate footer DOM
  const footer = document.createElement('div');
  while (fragment.firstElementChild) {
    footer.append(fragment.firstElementChild);
  }

  block.append(footer); // Ensure footer is appended before manipulating its content

  // Now that the footer is guaranteed to be in the DOM, select and manipulate it
  const footerBottom = document.querySelector('.footer-bottom-wrapper');
  if (footerBottom) {
    const colorStripe = createColorStripe();

    footerBottom.prepend(colorStripe);
  } else {
    console.error('Footer Bottom not found');
  }
}
