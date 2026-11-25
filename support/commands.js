Cypress.Commands.add("searchPokemon", (value) => {

  cy.get("#pokemonSearch").clear().type(value);

  cy.get("#search").click();

});