/**
 * Function to handle downloading the brochure
 * This opens the brochure HTML in a new tab, which the user can then print to PDF
 */
export function downloadBrochure() {
  // Open the brochure in a new tab
  window.open('/brochure/dime-events-brochure.html', '_blank');
}
