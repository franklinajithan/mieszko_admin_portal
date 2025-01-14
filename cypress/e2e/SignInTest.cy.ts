import { createTheme } from '@mui/material/styles';

describe('Sign In Page', () => {
  it('displays the correct sign-in text', () => {
    cy.visit('http://localhost:5173/pages/signin2');
    cy.get('[data-testid="signIn-text"]').should('have.text', 'Welcome back! Please sign in to continue.');
  });
});

describe('Sign In Page Structure', () => {
  it('should load the page with the correct structure', () => {
    cy.visit('http://localhost:5173/pages/signin2');
    cy.get('[data-testid="signIn-text"]').should('have.text', 'Welcome back! Please sign in to continue.');
    cy.get('input[name="email"]').should('exist').and('be.visible');
    cy.get('input[name="password"]').should('exist').and('be.visible');
    cy.get('button[type="submit"]').should('exist').and('contain', 'Sign In');
  });
});

describe('Password Visibility Toggle', () => {
  it('should toggle password visibility', () => {
    cy.visit('http://localhost:5173/pages/signin2');
    cy.get('input[name="password"]').should('exist').type('password123');
    cy.get('#toggle-password', { timeout: 5000 }).should('exist').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');
    cy.get('#toggle-password').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });
});

describe('Error Messages', () => {
  it('should display error messages for invalid or missing email and password', () => {
    cy.visit('http://localhost:5173/pages/signin2');

    // Submit the form without entering any data
    cy.get('button[type="submit"]').click();

    // Assert error messages for required fields
    cy.get('[data-testid="email-error"]').should('contain', 'Email is required');
    cy.get('[data-testid="password-error"]').should('contain', 'Password is required');

    // Test with an invalid email format
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="email-error"]').should('contain', 'Invalid email address');

    // Test with a short password
    cy.get('input[name="email"]').clear().type('valid@example.com');
    cy.get('input[name="password"]').type('123'); // Short password
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="password-error"]').should('contain', 'Password must be at least 6 characters long');
  });
});

describe('Login Functionality', () => {
  it('should log in successfully with valid credentials', () => {
    cy.visit('http://localhost:5173/pages/signin2');
    cy.get('input[name="email"]').type('superadmin@mieszko.uk');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/order/new-purchase-planning');
  });

  it('should show a success notification upon login', () => {
    cy.visit('http://localhost:5173/pages/signin2');
    cy.get('input[name="email"]').type('superadmin@mieszko.uk');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/order/new-purchase-planning');
    cy.get('.notification').should('contain', 'You have successfully logged in!');
  });
});

describe('Navigation', () => {
  it('should navigate to the signup page when "Create an Account" is clicked', () => {
    cy.visit('http://localhost:5173/pages/signin2');
    cy.contains('Create an Account').click();
    cy.url().should('include', '/pages/signup2');
  });
});
