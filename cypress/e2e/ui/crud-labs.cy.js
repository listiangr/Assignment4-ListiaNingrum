describe('Script Labs - CRUD UI Testing', () => {
  beforeEach(() => {
    cy.visit('https://labs.hendri.me')

    // Login
    cy.get('#email')
      .type('standard_user@example.com')

    cy.get('#password')
      .type('script_sauce')

    cy.get('button[type="submit"]')
      .click()

    // Pastikan login berhasil
    cy.contains('Hello, standard_user@example.com')
      .should('be.visible')
  })

  it('Create, Update, dan Delete Script Lab', () => {
    // Data unik setiap kali test dijalankan
    const scriptTitle = `Cypress Test ${Date.now()}`
    const description = 'Created by Cypress UI'
    const updatedDescription = 'Created by Cypress UI (Update)'

    // =========================
    // BUKA SCRIPT CRUD
    // =========================

    cy.contains('.dashboard-tab', 'Script CRUD')
      .scrollIntoView()
      .click()

    cy.contains('Add New Script Lab')
      .should('be.visible')

    // Cek field Create
    cy.get('#title')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Enter script title...')

    cy.get('#description')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Enter script description...')

    cy.wait(2000)


    // =========================
    // CREATE
    // =========================

    cy.get('#title')
      .type(scriptTitle)

    cy.get('#description')
      .type(description)

    cy.contains('button', 'Add Script')
      .click()

    // Assert hasil create
    cy.contains(scriptTitle)
      .should('be.visible')

    cy.contains(description)
      .should('be.visible')

    cy.scrollTo('bottom')
    cy.wait(5000)


    // =========================
    // UPDATE
    // =========================

    // Cari card yang dibuat tadi lalu klik Edit
    cy.contains('.script-card', scriptTitle)
      .within(() => {
        cy.contains('button', 'Edit')
          .click()
      })

    // Pastikan benar record yang sedang diedit
    cy.get('input.editable-title')
      .should('be.visible')
      .and('have.value', scriptTitle)

    // Update description
    cy.get('textarea.editable-description')
      .should('be.visible')
      .clear()
      .type(updatedDescription)

    // Simpan
    cy.contains('button', 'Save')
      .click()

    // Assert hasil update
    cy.contains(scriptTitle)
      .should('be.visible')

    cy.contains(updatedDescription)
      .should('be.visible')
    
    cy.wait(5000)


    // =========================
    // DELETE
    // =========================

    cy.contains('.script-card', scriptTitle)
      .within(() => {
        cy.contains('button', 'Delete')
          .click()
      })

    // Pastikan confirmation muncul
    cy.contains('h3', 'Confirm Delete')
      .should('be.visible')

    // Pastikan record yang akan dihapus benar
    cy.contains(`"${scriptTitle}"`)
      .should('be.visible')

    // Cari container terdekat yang punya tombol,
    // lalu klik Delete di dalam confirmation tersebut
    cy.contains(`"${scriptTitle}"`)
      .parents()
      .filter(':has(button)')
      .first()
      .within(() => {
        cy.contains('button', 'Delete')
          .should('be.visible')
          .click()
      })

    // Pastikan data sudah hilang
    cy.contains(scriptTitle)
      .should('not.exist')

  })
})