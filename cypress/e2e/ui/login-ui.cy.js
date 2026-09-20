describe('Login UI Testing', () => {

  beforeEach(() => {
    cy.visit('https://labs.hendri.me')
  })

  it('Halaman login', () => {
    cy.contains(/login or register/i)
      .should('be.visible')

    cy.contains(/welcome to script labs/i)
      .should('be.visible')

    cy.contains(/email address/i)
      .should('be.visible')

    cy.get('#email')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Enter your email')

    cy.contains(/password/i)
      .should('be.visible')

    cy.get('#password')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Enter your password')

    cy.get('button[type="submit"]')
      .should('be.visible')
      .and('be.enabled')
      .and('contain.text', 'Sign In')
  })

  it('Login gagal', () => {
    cy.get('#email')
      .type('standard_user@example.com')

    cy.get('#password')
      .type('salah123')

    cy.get('button[type="submit"]')
      .click()

    cy.contains('Invalid email or password')
      .should('be.visible')
  })

  it('Login sukses', () => {
    cy.get('#email')
      .type('standard_user@example.com')

    cy.get('#password')
      .type('script_sauce')

    cy.get('button[type="submit"]')
      .click()

    cy.contains('Hello, standard_user@example.com')
      .should('be.visible')

    cy.contains('button', 'Logout')
      .should('be.visible')
      .and('be.enabled')

    cy.contains('Shop automation assets and test a realistic checkout journey.')
      .should('be.visible')
  })

})