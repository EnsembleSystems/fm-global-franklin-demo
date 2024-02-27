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

    block.append(footer); // Ensure footer is appended before manipulating its content

    // Now that the footer is guaranteed to be in the DOM, select and manipulate it
    const footerContainer = document.querySelector('.footer-container');
    if (footerContainer) {
      const colorStripe = document.createElement('div');
      const colorTeal = document.createElement('div');
      const colorGray = document.createElement('div');
      const colorPurple = document.createElement('div');
      const colorYellow = document.createElement('div');

      // Setup classes for styling
      colorStripe.classList.add('colorStripe');
      colorTeal.classList.add('colorStripeSegment', 'teal');
      colorGray.classList.add('colorStripeSegment', 'gray');
      colorPurple.classList.add('colorStripeSegment', 'purple');
      colorYellow.classList.add('colorStripeSegment', 'yellow');

      // Append color divs as children of colorStripe
      colorStripe.appendChild(colorTeal);
      colorStripe.appendChild(colorGray);
      colorStripe.appendChild(colorPurple);
      colorStripe.appendChild(colorYellow);

      // Finally, append colorStripe as a child of footerContainer
      footerContainer.prepend(colorStripe);
    } else {
      console.error('Footer container not found');
    }
  } else {
    // If loading failed for some reason, reset isFooterLoaded to allow retry
    isFooterLoaded = false;
  }
}
