const mockUsers = {
  name: 'Jason Bonhan',
  email: 'jason@led.com',
  phone: '11999999999',
  cpf: '11111111111'
}

describe('Edit User', () => {
  it('Editing user', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[id=home-link-go-to-list-users]').click()
    cy.get(`[id=show-modal-user-0-button]`).click()
    cy.get(`[id=edit-user-0-popup-button]`).click()

    cy.get('[name=name]').clear().type(mockUsers.name)
    cy.get('[name=email]').clear().type(mockUsers.email)
    cy.get('[name=phone]').clear().type(mockUsers.phone)
    cy.get('[name=cpf]').clear().type(mockUsers.cpf)
    cy.get('[id=register-user-button').click()
    cy.get(`[id=user-phone-${mockUsers.phone}]`).should('exist')

    cy.contains('span', mockUsers.name)
    cy.contains('span', mockUsers.email)
  })
})