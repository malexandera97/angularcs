describe('Navegación y Tracking', () => {
  beforeEach(() => {
    // Login primero
    cy.visit('/login');
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('admin');
    cy.get('button[type="submit"]').click();
  });

  it('debería navegar entre páginas correctamente', () => {
    // Verificar navegación a items
    cy.url().should('include', '/items');
    cy.get('h1').should('exist');

    // Navegar a mapa
    cy.get('a[routerLink="/map"]').click();
    cy.url().should('include', '/map');
    cy.get('h3').should('contain', 'Mapa Interactivo');

    // Navegar a animaciones
    cy.get('a[routerLink="/animated"]').click();
    cy.url().should('include', '/animated');
    cy.get('h3').should('contain', 'Tarjeta Animada');

    // Navegar a tracking
    cy.get('a[routerLink="/tracking"]').click();
    cy.url().should('include', '/tracking');
    cy.get('h3').should('contain', 'Dashboard de Tracking');
  });

  it('debería trackear clicks en elementos con directiva', () => {
    // Ir al dashboard de tracking
    cy.get('a[routerLink="/tracking"]').click();

    // Verificar que inicialmente no hay datos
    cy.get('.no-data').should('exist');

    // Hacer clicks en elementos con tracking
    cy.get('a[routerLink="/animated"]').click();
    cy.get('.card').click();

    // Volver al dashboard
    cy.get('a[routerLink="/tracking"]').click();

    // Verificar que se registraron los clicks
    cy.get('.tag-card').should('have.length.greaterThan', 0);
    cy.get('.count').should('not.contain', '0');
  });

  it('debería mostrar contadores actualizados en tiempo real', () => {
    // Ir a animaciones
    cy.get('a[routerLink="/animated"]').click();

    // Hacer múltiples clicks
    cy.get('.card').click();
    cy.get('button').contains('Mostrar Detalles').click();

    // Ir al dashboard
    cy.get('a[routerLink="/tracking"]').click();

    // Verificar que los contadores se actualizaron
    cy.get('.total .count').should('not.contain', '0');
    cy.get('.tag-card').should('exist');
  });
});
