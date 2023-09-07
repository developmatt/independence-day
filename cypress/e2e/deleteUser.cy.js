describe('Delete User', () => {
  it('Deleting user', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[id=home-link-go-to-list-users]').click()

    cy.get('[id=user-name-index-0]').then(($el) => {
      cy.get(`[id=show-modal-user-0-button]`).click()
      cy.get(`[id=delete-user-0-popup-button]`).click()
      cy.on('window:confirm', () => true)
      cy.reload()
      cy.contains('span', $el.text()).should('not.exist')
    })
  })
})