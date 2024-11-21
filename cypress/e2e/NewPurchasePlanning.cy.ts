describe('NewPurchasePlanning Section', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/pages/signin2');
        cy.get('input[name="email"]').type('superadmin@mieszko.uk');
        cy.get('input[name="password"]').type('123456');
        cy.get('button[type="submit"]').click();
        cy.visit('http://localhost:5173/order/new-purchase-planning');
    });

    it('renders the section correctly', () => {
        // Verify the header components
        // cy.contains('Test Title').should('be.visible');
        // cy.get('[data-icon="shopping-cart"]').should('exist');

        // Verify form fields
        cy.get('[aria-label="Document No"]').should('be.visible');
        cy.get('[aria-label="Store No"]').should('be.visible');
        cy.get('[aria-label="Supplier"]').should('be.visible');
        cy.get('[aria-label="Expected Delivery Date"]').should('be.visible');

        // Verify DataGrid
        cy.get('[role="grid"]').should('exist');
        cy.get('[role="columnheader"]').should('have.length.greaterThan', 0); // Columns exist
        cy.get('[role="row"]').should('have.length.greaterThan', 1); // Rows exist
    });

    // it('allows user to interact with form fields', () => {
    //     // Fill out form inputs
    //     cy.get('[aria-label="Document No"]').type('DOC123');
    //     cy.get('[aria-label="Store No"]').type('Store001');
    //     cy.get('[aria-label="Supplier"]').select('Option 1');
    //     cy.get('[aria-label="Expected Delivery Date"]').type('2024-12-01');

    //     // Interact with checkboxes
    //     cy.get('#currentStock').click().should('be.checked');
    //     cy.get('#rtcSales').click().should('be.checked');

    //     // Submit the form
    //     cy.contains('Submit').click();

    //     // Verify loading state and form submission completion
    //     cy.contains('Loading...').should('be.visible');
    //     cy.contains('Loading...').should('not.exist'); // Ensure it disappears
    // });

    // it('shows validation errors for invalid input', () => {
    //     // Submit the form without filling it out
    //     cy.contains('Submit').click();

    //     // Check validation messages
    //     cy.contains('Document No is required').should('be.visible');
    //     cy.contains('Store No is required').should('be.visible');
    //     cy.contains('Expected Delivery Date is required').should('be.visible');

    //     // Test invalid input (e.g., invalid date)
    //     cy.get('[aria-label="Expected Delivery Date"]').type('invalid-date');
    //     cy.contains('Submit').click();
    //     cy.contains('Invalid date format').should('be.visible');
    // });

    // it('renders DataGrid rows and allows selection', () => {
    //     // Verify rows and columns in the DataGrid
    //     cy.get('[role="grid"]').within(() => {
    //         cy.contains('SUP607').should('exist');
    //         cy.contains('SUP845').should('exist');
    //     });

    //     // Select a row
    //     cy.get('[role="grid"]').within(() => {
    //         cy.get('input[type="checkbox"]').first().check();
    //         cy.get('input[type="checkbox"]').first().should('be.checked');
    //     });
    // });

    // it('allows column visibility toggle in DataGrid', () => {
    //     // Open column visibility menu and toggle a column
    //     cy.get('[role="grid"]').within(() => {
    //         cy.get('button[aria-label="Column visibility"]').click();
    //         cy.contains('Supplier ID').click(); // Hide "Supplier ID" column
    //         cy.contains('Supplier ID').should('not.exist'); // Column is hidden
    //     });
    // });

    // it('navigates to other sections using navigation buttons', () => {
    //     // Click on a navigation link (e.g., "Create New Plan")
    //     cy.contains('Create New Plan').click();

    //     // Verify navigation to the correct URL
    //     cy.url().should('include', '/order/new-plan');

    //     // Navigate back
    //     cy.go('back');
    //     cy.url().should('include', '/order/new-purchase-planning');
    // });

    // it('responds to theme changes', () => {
    //     // Verify default theme (light/dark mode)
    //     const currentSkin = localStorage.getItem('skin-mode') || 'light';
    //     if (currentSkin === 'dark') {
    //         cy.get('.main').should('have.class', 'dark-mode');
    //     } else {
    //         cy.get('.main').should('not.have.class', 'dark-mode');
    //     }

    //     // Simulate changing theme
    //     cy.get('#theme-toggle').click(); // Assuming there's a theme toggle button
    //     cy.get('.main').should(
    //         currentSkin === 'dark' ? 'not.have.class' : 'have.class',
    //         'dark-mode'
    //     );
    // });

    // it('handles grid toolbar functionalities', () => {
    //     // Verify toolbar buttons
    //     cy.get('[role="toolbar"]').should('exist');
    //     cy.get('button[aria-label="Export to CSV"]').click();

    //     // Verify file download (ensure your environment supports file assertions)
    //     cy.readFile('cypress/downloads/export.csv').should('exist');
    // });
});
