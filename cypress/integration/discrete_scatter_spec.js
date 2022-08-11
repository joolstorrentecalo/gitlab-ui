describe('GlDiscreteScatterChart', () => {
  beforeEach(() => {
    cy.visitStory('charts/discrete-scatter-chart');

    cy.findByTestId('discrete-scatter-chart').get('path').last().trigger('mousemove');
  });

  it('tooltip title should render', () => {
    cy.get('.popover-header').should('be.visible').contains('25 May (Date)');
  });

  it('tooltip content should render', () => {
    cy.get('.popover-body').should('be.visible').contains('Pushes per day 4.26');
  });
});
