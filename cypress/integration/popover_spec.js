describe('GlPopover', () => {
  it('popover title should be visible when using props', () => {
    cy.visitStory('popover');

    cy.findByTestId('popover-with-props').contains('Popover');
  });

  it('popover title should be visible when using scoped slot', () => {
    cy.visit('iframe.html?id=base-popover--on-click&viewMode=story');

    cy.findByTestId('popover-button-click').click();

    cy.findByTestId('popover-title').should('be.visible').contains('Popover title');
  });

  it('closes popover when clicking on close button', () => {
    cy.visitStory('popover', 'with-close-button');

    cy.findByTestId('popover-with-close-button').should('exist').should('be.visible');

    cy.findByTestId('close-button').click();

    cy.findByTestId('popover-with-close-button').should('not.exist');
  });
});
