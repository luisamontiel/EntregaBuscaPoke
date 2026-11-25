class PokemonPage {

  visit() {
    cy.visit("/");
  }

  searchPokemon(value) {
    cy.get("#pokemonSearch").clear().type(value);
  }

  clickSearch() {
    cy.get("#search").click();
  }

  getName() {
    return cy.get("#pokemon-name");
  }

  getId() {
    return cy.get("#pokemon-id");
  }

  getTypes() {
    return cy.get("#pokemon-types");
  }

  getAbilities() {
    return cy.get("#pokemon-abilities");
  }

  getStats() {
    return cy.get("#pokemon-stats li");
  }

  getError() {
    return cy.get("#pokemon-error");
  }

}

export default new PokemonPage();