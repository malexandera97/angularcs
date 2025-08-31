describe('Autenticación', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('debería redirigir al login cuando no está autenticado', () => {
    cy.url().should('include', '/login');
    cy.get('h2').should('contain', 'Iniciar Sesión');
  });

  it('debería mostrar error con credenciales incorrectas', () => {
    cy.get('input[name="username"]').type('wronguser');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    cy.get('.alert').should('contain', 'Credenciales incorrectas');
  });

  it('debería permitir login con credenciales correctas', () => {
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('admin');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/items');
  });

  it('debería mantener la sesión después del login', () => {
    // Login
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('admin');
    cy.get('button[type="submit"]').click();

    // Verificar que estamos en items
    cy.url().should('include', '/items');

    // Recargar la página
    cy.reload();

    // Deberíamos seguir autenticados
    cy.url().should('include', '/items');
  });
});
