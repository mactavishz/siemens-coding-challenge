describe('Frontend-Backend Integration Tests', () => {
  beforeEach(() => {
    // Visit the application
    cy.visit('/')
    
    // Wait for initial page load
    cy.contains('h2', 'Current Counter Value:').should('be.visible')
  })

  it('should retrieve counter value directly from backend API', () => {
    // Make direct API call to backend
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/counter/get`,
      failOnStatusCode: false
    }).then((response) => {
      // Assert API response
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('value')
      
      const initialValue = response.body.value
      
      // Verify UI shows the same value from API
      cy.contains('h2', `Current Counter Value: ${initialValue}`).should('be.visible')
    })
  })
  
  it('should increment counter value when button is clicked', () => {
    cy.get('h2').contains(/Current Counter Value: (\d+)/).invoke('text').then((text) => {
      return parseInt(text.match(/Current Counter Value: (\d+)/)[1]);
    }).then((initialValue) => {
      // Click the increment button
      cy.contains('button', 'Increment').click()

      cy.wait(200) // Wait for the UI to update
      // Verify counter updated in UI
      cy.contains('h2', `Current Counter Value: ${initialValue + 1}`).should('be.visible')
    })
  })

  it('should correctly update counter value when multiple users increment it', () => {
    // First user visits the page
    cy.visit('/')

    cy.wait(200)

    // Get the initial counter value from the UI
    let initialValue
    cy.get('h2').contains(/Current Counter Value: (\d+)/).invoke('text').then((text) => {
      initialValue = parseInt(text.match(/Current Counter Value: (\d+)/)[1])
     
      cy.contains('h2', `Current Counter Value: ${initialValue}`).should('be.visible')

      // First user increments the counter by clicking the button
      cy.contains('button', 'Increment').click()
      
      cy.wait(200)
      
      // Wait for the UI to update with new value
      cy.contains('h2', `Current Counter Value: ${initialValue + 1}`).should('be.visible')
      
      // Simulate second user in a new browser session
      cy.session('second-user', () => {
        cy.visit('/')
        
        cy.wait(200)

        // Second user should see the incremented value from first user
        cy.contains('h2', `Current Counter Value: ${initialValue + 1}`).should('be.visible')
        
        // Second user clicks the increment button
        cy.contains('button', 'Increment').click()
        
        cy.wait(200)
        // Second user should see the counter increase again
        cy.contains('h2', `Current Counter Value: ${initialValue + 2}`).should('be.visible')
      })
      
      // First user refreshes the page and should see the value after both increments
      cy.visit('/')

      cy.wait(200)

      cy.contains('h2', `Current Counter Value: ${initialValue + 2}`).should('be.visible')
    })
  })
})