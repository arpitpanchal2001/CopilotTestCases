// Cypress E2E tests for Login Functionality
// File: cypress/e2e/login.cy.js

describe('Login Functionality', () => {
  const url = 'http://14.99.144.154:50152/Account/Login';

  beforeEach(() => {
    cy.visit(url);
  });

  // login test cases
  it('should login successfully with valid credentials', () => { // edited
    cy.get('input#Username').type('AndyWVS');
    cy.get('input#Password').type('EasterBush1');
    cy.get('input[value="Login"]').click();
    cy.contains('Dashboard').should('be.visible'); 
    
  });

  it('should show error for invalid username', () => {
    cy.get('input#Username').type('WrongUser');
    cy.get('input#Password').type('EasterBush1');
    cy.get('input[value="Login"]').click();
    cy.contains('Please enter valid credentials').should('be.visible'); 
  });

  it('should show error for invalid password', () => {
    cy.get('input#Username').type('AndyWVS');
    cy.get('input#Password').type('WrongPass');
    cy.get('input[value="Login"]').click();
    cy.contains('Please enter valid credentials').should('be.visible');
  });



  it('should handle special characters in username and password', () => {
    cy.get('input#Username').type('!@#$%^&*()');
    cy.get('input#Password').type('!@#$%^&*()');
    cy.get('input[value="Login"]').click();
    cy.contains('Please enter valid credentials').should('be.visible');
  });

  it('should handle very long username and password', () => {
    const longStr = 'a'.repeat(256);
    cy.get('input#Username').type(longStr);
    cy.get('input#Password').type(longStr);
    cy.get('input[value="Login"]').click();
    cy.contains('Please enter valid credentials').should('be.visible');
  });
});
