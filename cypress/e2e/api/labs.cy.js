describe('Labs API Automation', () => {
  let token
  let labId
  let labTitle

  const baseLoginUrl = 'https://api-script-labs.hendri.me/api/auth/login'
  const baseLabsUrl = 'https://api-script-labs.hendri.me/api/labs'

  // Login satu kali sebelum semua test dijalankan
  before(() => {
    cy.request({
      method: 'POST',
      url: baseLoginUrl,
      body: {
        email: 'standard_user@example.com',
        password: 'script_sauce'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)

      // Simpan token hasil login
      token = response.body.data.token

      expect(token).to.exist
    })
  })


  // ==========================================================================
  // POST
  // ==========================================================================

  // Positive Case: membuat Lab dengan data valid
  it('POST /api/labs - positive (create valid data)', () => {

    // Title dibuat unik agar tidak bentrok dengan test sebelumnya
    labTitle = `Automation Lab ${Date.now()}`

    cy.request({
      method: 'POST',
      url: baseLabsUrl,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        title: labTitle,
        description: 'Created by Cypress automation'
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.exist

      // Simpan ID hasil POST untuk test berikutnya
      labId = response.body.data.id

      expect(labId).to.exist
    })
  })


  // Negative Case: membuat Lab dengan title yang sama
  it('POST /api/labs - negative (duplicate data)', () => {
    cy.request({
      method: 'POST',
      url: baseLabsUrl,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        title: labTitle,
        description: 'Created by Cypress automation'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(409)
      expect(response.body).to.exist
    })
  })


  // ==========================================================================
  // GET
  // ==========================================================================

  // Positive Case: mengambil Lab dengan ID hasil POST
  it('GET /api/labs/{id} - positive (id valid)', () => {
    cy.request({
      method: 'GET',
      url: `${baseLabsUrl}/${labId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.exist
    })
  })


  // Negative Case: mengambil Lab dengan ID yang tidak tersedia
  it('GET /api/labs/{id} - negative (id not found)', () => {
    cy.request({
      method: 'GET',
      url: `${baseLabsUrl}/999999999`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.exist
    })
  })


  // ==========================================================================
  // PUT
  // ==========================================================================

  // Positive Case: update Lab hasil POST
  it('PUT /api/labs/{id} - positive (update valid data)', () => {
    cy.request({
      method: 'PUT',
      url: `${baseLabsUrl}/${labId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        title: `Updated Automation Lab ${Date.now()}`,
        description: 'Updated by Cypress automation'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.exist
    })
  })


  // Negative Case: update Lab dengan field kosong
  it('PUT /api/labs/{id} - negative (empty required fields)', () => {
    cy.request({
      method: 'PUT',
      url: `${baseLabsUrl}/${labId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        title: '',
        description: ''
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.exist
    })
  })


  // ==========================================================================
  // DELETE
  // ==========================================================================

  // Positive Case: hapus Lab hasil POST
  it('DELETE /api/labs/{id} - positive (delete valid data)', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseLabsUrl}/${labId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.exist
    })
  })


  // Negative Case: hapus kembali Lab yang sudah terhapus
  it('DELETE /api/labs/{id} - negative (already deleted)', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseLabsUrl}/${labId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.exist
    })
  })
})