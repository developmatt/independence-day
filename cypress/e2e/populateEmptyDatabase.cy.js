describe('Populate Empty Database', () => {
  it('All the default users are listed in a empty localStorage', () => {
    localStorage.clear()
    cy.visit('http://localhost:5173/')
    cy.get('[id=home-link-go-to-list-users]').click()
    cy.request('https://private-9d65b3-tinnova.apiary-mock.com/users').then(({body}) => {
      body.forEach((user, index) => {
        cy.contains('span', user.name)
        cy.contains('span', user.email)
        cy.get(`[id=user-phone-${user.phone}]`).should('exist')
        cy.get(`[id=show-cpf-${index}]`).click()
        cy.get(`[id=user-cpf-${user.cpf}]`).should('exist')
      })
    })
  })
})

