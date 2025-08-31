describe('Funcionalidades de Items y Animaciones', () => {
  beforeEach(() => {
    // Login primero
    cy.visit('/login');
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('admin');
    cy.get('button[type="submit"]').click();
  });

  it('debería mostrar la lista de items correctamente', () => {
    cy.url().should('include', '/items');

    // Verificar que hay items en la lista
    cy.get('.item-card').should('have.length.greaterThan', 0);

    // Verificar que cada item tiene nombre y botones de voto
    cy.get('.item-card').each(($card) => {
      cy.wrap($card).find('.item-name').should('exist');
      cy.wrap($card).find('button').should('have.length', 2); // upvote y downvote
    });
  });

  it('debería permitir votar en items', () => {
    // Obtener el contador inicial del primer item
    cy.get('.item-card').first().find('.upvotes').invoke('text').as('initialUpvotes');

    // Hacer upvote
    cy.get('.item-card').first().find('button').first().click();

    // Verificar que el contador aumentó
    cy.get('.item-card').first().find('.upvotes').invoke('text').should('not.equal', '@initialUpvotes');
  });

  it('debería mostrar animaciones en el componente animado', () => {
    // Ir a animaciones
    cy.get('a[routerLink="/animated"]').click();

    // Verificar que la tarjeta está en estado inicial
    cy.get('.card').should('have.class', 'inactive');

    // Hacer click para cambiar estado
    cy.get('.card').click();

    // Verificar que cambió a estado activo
    cy.get('.card').should('have.class', 'active');

    // Verificar que el contador se actualizó
    cy.get('.click-counter').should('contain', 'Clicks: 1');
  });

  it('debería mostrar/ocultar detalles con animación', () => {
    // Ir a animaciones
    cy.get('a[routerLink="/animated"]').click();

    // Verificar que los detalles no están visibles
    cy.get('.details-section').should('not.exist');

    // Hacer click en el botón de detalles
    cy.get('button').contains('Mostrar Detalles').click();

    // Verificar que los detalles aparecen
    cy.get('.details-section').should('be.visible');
    cy.get('.alert').should('contain', 'Detalles de la Animación');

    // Ocultar detalles
    cy.get('button').contains('Ocultar Detalles').click();

    // Verificar que los detalles desaparecen
    cy.get('.details-section').should('not.exist');
  });

  it('debería funcionar el mapa interactivo', () => {
    // Ir al mapa
    cy.get('a[routerLink="/map"]').click();

    // Verificar que el mapa se carga
    cy.get('#map').should('exist');
    cy.get('h3').should('contain', 'Mapa Interactivo');

    // Verificar que hay instrucciones
    cy.get('.map-info').should('contain', 'Haz click en el marker');
  });
});
