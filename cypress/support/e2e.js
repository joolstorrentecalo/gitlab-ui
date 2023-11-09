// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import 'cypress-axe';
import registerCypressGrep from '@cypress/grep/src/support';
import './commands';

registerCypressGrep();

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err) => {
  // Since Storybook 7, we are seeing ResizeObserver errors when running Cypress. Those can be
  // ignored as they do not seem to affect the actual tests.
  return !/ResizeObserver loop completed/.test(err.message);
});
