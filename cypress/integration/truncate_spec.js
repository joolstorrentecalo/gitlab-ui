describe('GlTruncate', () => {
  const text =
    'src/thisIs/AVeryLongFilePath/that/needs/to/be/smartly/truncated/from/the/middle/so/we/dont/lose/important/information/here.vue';

  before(() => {
    cy.viewport(1000, 800);
    cy.visit(
      `iframe.html?id=utilities-truncate--default&viewMode=story&knob-text=${text}&knob-position=end&knob-withTooltip=true`
    );
  });

  it('shows a tooltip only when text is being truncated', () => {
    // Click on the truncated text to reveal the tooltip
    cy.findByTestId('truncate-end-container').click();
    cy.get('[role="tooltip"]').first().should('exist').contains(text);

    // Click outside of the text to hide the tooltip
    cy.get('body').first().click(100, 100, { force: true });
    cy.get('[role="tooltip"]').should('not.exist');

    // Resize the viewport so that the text doesn't need to be truncated anymore
    cy.viewport(1500, 800);

    // Click on the text again, the tooltip should not show up anymore
    cy.findByTestId('truncate-end-container').click();
    cy.get('[role="tooltip"]').should('not.exist');
  });
});
