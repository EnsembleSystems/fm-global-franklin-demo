function createColorStripe() {
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
  
    return colorStripe;
  }
  
  export { createColorStripe };
  