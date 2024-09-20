describe('GlProgressBar', () => {
  function checkA11yDefaultState() {
    cy.visitStory('base/progress-bar');
  }

  function checkA11ySuccessState() {
    cy.visitStory('base/progress-bar', {
      story: 'success',
    });
  }

  function checkA11yWarningState() {
    cy.visitStory('base/progress-bar', {
      story: 'warning',
    });
  }

  function checkA11yDangerState() {
    cy.visitStory('base/progress-bar', {
      story: 'danger',
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11yDefaultState,
      checkA11ySuccessState,
      checkA11yWarningState,
      checkA11yDangerState,
    });
  });
});
