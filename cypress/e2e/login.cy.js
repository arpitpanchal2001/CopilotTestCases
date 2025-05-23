// Cypress E2E tests for Login Functionality
// File: cypress/e2e/login.cy.js

describe('Login Functionality', () => {
  const url = 'http://14.99.144.154:50152/Account/Login';

  beforeEach(() => {
    cy.visit(url);
  });

  it('should login successfully with valid credentials', () => {
    cy.get('input[name="username"], input#username, input[name="UserName"], input#UserName').type('AndyWVS');
    cy.get('input[name="password"], input#password, input[name="Password"], input#Password').type('AndyWVS');
    cy.get('button[type="submit"], input[type="submit"], button:contains("Login")').click();
    cy.contains('Dashboard').should('be.visible'); // Adjust as per actual post-login UI
  });

  it('should show error for invalid username', () => {
    cy.get('input[name="username"], input#username, input[name="UserName"], input#UserName').type('WrongUser');
    cy.get('input[name="password"], input#password, input[name="Password"], input#Password').type('AndyWVS');
    cy.get('button[type="submit"], input[type="submit"], button:contains("Login")').click();
    cy.contains('Invalid username or password').should('be.visible'); // Adjust error message as needed
  });

  it('should show error for invalid password', () => {
    cy.get('input[name="username"], input#username, input[name="UserName"], input#UserName').type('AndyWVS');
    cy.get('input[name="password"], input#password, input[name="Password"], input#Password').type('WrongPass');
    cy.get('button[type="submit"], input[type="submit"], button:contains("Login")').click();
    cy.contains('Invalid username or password').should('be.visible');
  });

  it('should show error for blank username and password', () => {
    cy.get('button[type="submit"], input[type="submit"], button:contains("Login")').click();
    cy.contains('Username is required').should('be.visible'); // Adjust as per actual validation
    cy.contains('Password is required').should('be.visible');
  });

  it('should handle special characters in username and password', () => {
    cy.get('input[name="username"], input#username, input[name="UserName"], input#UserName').type('!@#$%^&*()');
    cy.get('input[name="password"], input#password, input[name="Password"], input#Password').type('!@#$%^&*()');
    cy.get('button[type="submit"], input[type="submit"], button:contains("Login")').click();
    cy.contains('Invalid username or password').should('be.visible');
  });

  it('should handle very long username and password', () => {
    const longStr = 'a'.repeat(256);
    cy.get('input[name="username"], input#username, input[name="UserName"], input#UserName').type(longStr);
    cy.get('input[name="password"], input#password, input[name="Password"], input#Password').type(longStr);
    cy.get('button[type="submit"], input[type="submit"], button:contains("Login")').click();
    cy.contains('Invalid username or password').should('be.visible');
  });
});
