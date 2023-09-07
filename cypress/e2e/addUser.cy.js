const mockUsers = {
  name: 'John Bonhan',
  email: 'john@led.com',
  phone: '11999999999',
  cpf: '11111111111'
}

describe('Add User', () => {
  it('Adding user', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[id=home-link-go-to-add-user]').click()
    cy.get('[name=name]').type(mockUsers.name)
    cy.get('[name=email]').type(mockUsers.email)
    cy.get('[name=phone]').type(mockUsers.phone)
    cy.get('[name=cpf]').type(mockUsers.cpf)
    cy.get('[id=register-user-button').click()

    cy.get('[id=home-link-go-to-list-users]').click()
    cy.get(`[id=user-phone-${mockUsers.phone}]`).should('exist')

    cy.contains('span', mockUsers.name)
    cy.contains('span', mockUsers.email)
  })
})