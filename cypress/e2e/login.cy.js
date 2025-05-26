// Cypress E2E tests for Login Functionality
// File: cypress/e2e/login.cy.js

describe('Login Functionality', () => {
  const url = 'http://14.99.144.154:50152/Account/Login';

  beforeEach(() => {
    cy.visit(url);
  });

  // login test cases
  it('should login successfully with valid credentials', () => {
    cy.get('input#Username').type('AndyWVS');
    cy.get('input#Password').type('AndyWVS');
    cy.get('input[value="Login"]').click();
    cy.contains('Dashboard').should('be.visible'); // Adjust as per actual post-login UI
    
  });

  it('should show error for invalid username', () => {
    cy.get('input#Username').type('WrongUser');
    cy.get('input#Password').type('AndyWVS');
    cy.get('input[value="Login"]').click();
    cy.contains('Invalid username or password').should('be.visible'); // Adjust error message as needed
  });

  it('should show error for invalid password', () => {
    cy.get('input#Username').type('AndyWVS');
    cy.get('input#Password').type('WrongPass');
    cy.get('input[value="Login"]').click();
    cy.contains('Invalid username or password').should('be.visible');
  });

  it('should show error for blank username and password', () => {
    cy.get('input[value="Login"]').click();
    cy.contains('Username is required').should('be.visible'); // Adjust as per actual validation
    cy.contains('Password is required').should('be.visible');
  });

  it('should handle special characters in username and password', () => {
    cy.get('input#Username').type('!@#$%^&*()');
    cy.get('input#Password').type('!@#$%^&*()');
    cy.get('input[value="Login"]').click();
    cy.contains('Invalid username or password').should('be.visible');
  });

  it('should handle very long username and password', () => {
    const longStr = 'a'.repeat(256);
    cy.get('input#Username').type(longStr);
    cy.get('input#Password').type(longStr);
    cy.get('input[value="Login"]').click();
    cy.contains('Invalid username or password').should('be.visible');
  });
});
