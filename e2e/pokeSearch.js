import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import PokemonPage from "../pages/PokemonPage"
before(function()  {
 cy.fixture("pokemon").then((data) => {
    this.pokemonData = data;
  });
});

Given("que el usuario se encuentra en la página principal de búsqueda", () => {

  PokemonPage.visit();

});

When("el usuario ingresa el ID {string} en el campo de búsqueda", (id) => {
cy.intercept("GET", "**/api/v2/pokemon/**")
  .as("pokemonRequest");
  PokemonPage.searchPokemon(id);

});

When("el usuario ingresa el nombre {string} en el campo de búsqueda", (name) => {

 cy.intercept("GET", "**/api/v2/pokemon/**")
  .as("pokemonRequest");
  PokemonPage.searchPokemon(name);

});


When("el usuario ingresa el nombre inexistente {string} en el campo de búsqueda", (termino) => {

 cy.intercept("GET", "**/api/v2/pokemon/**")
  .as("pokemonRequest");
  PokemonPage.searchPokemon(termino);

});


When("hace clic en el botón {string}", () => {

  PokemonPage.clickSearch();

});


When("el usuario consulta un Pokémon válido con ID {string}", (id) => {

 cy.intercept("GET", "**/api/v2/pokemon/**")
  .as("pokemonRequest");

  PokemonPage.searchPokemon(id);
  PokemonPage.clickSearch();

});

Then("la API responde con un código de estado {int}", (statusCode) => {

  cy.wait("@pokemonRequest").then(({ response }) => {

    expect(response, "Respuesta de PokéAPI").to.exist;

    expect(response.statusCode).to.equal(statusCode);

    if (statusCode === 200) {
      cy.wrap(response.body).as("pokemonBody");
    }

  });

});


Then("se muestra el nombre {string} en pantalla", (name) => {

  PokemonPage.getName()
    .should("be.visible")
    .and("have.text", name);

});


Then("se muestra el ID {string} en la información general", (id) => {

  PokemonPage.getId()
    .should("contain.text", id);

});


Then("se muestra el nombre {string} y el ID {string}", (name, id) => {

  PokemonPage.getName()
    .should("be.visible")
    .and("have.text", name);

  PokemonPage.getId()
    .should("contain.text", id);

});


Then("se muestran los tipos {string}", (types) => {

  PokemonPage.getTypes()
    .should("contain.text", types);

});


Then("se muestran las habilidades {string} y {string}", (ability1, ability2) => {

  PokemonPage.getAbilities()
    .should("contain.text", ability1)
    .and("contain.text", ability2);

});


Then("se visualiza una lista con {int} estadísticas base", (quantity) => {

  PokemonPage.getStats()
    .should("have.length", quantity);

});


Then("se muestra el mensaje de error {string}", (message) => {

  PokemonPage.getError()
    .should("be.visible")
    .and("contain.text", message);

});



Then("el nombre y el ID coinciden con el Fixture de {string}", function (pokemonName) {

  const expected = this.pokemonData[pokemonName];

  PokemonPage.getName()
    .should("have.text", expected.name);

  PokemonPage.getId()
    .should("contain.text", expected.id);

});


Then(
  "la respuesta contiene las propiedades {string}, {string}, {string}, {string} y {string}",
  (p1, p2, p3, p4, p5) => {

    cy.get("@pokemonBody").then((data) => {

      expect(data).to.include.all.keys(
        p1,
        p2,
        p3,
        p4,
        p5
      );

    });

  }
);


Then("el campo {string} es de tipo numérico", (campo) => {

  cy.get("@pokemonBody").then((data) => {

    expect(data[campo]).to.be.a("number");

  });

});


Then("el campo {string} es una cadena de texto no vacía", (campo) => {

  cy.get("@pokemonBody").then((data) => {

    expect(data[campo]).to.be.a("string").and.not.be.empty;

  });

});


Then(
  "los campos {string}, {string} y {string} son arreglos con sus tipos de datos internos válidos",
  (c1, c2, c3) => {

    cy.get("@pokemonBody").then((data) => {

      // Validar arreglos
      expect(data[c1]).to.be.an("array").and.not.be.empty;
      expect(data[c2]).to.be.an("array").and.not.be.empty;
      expect(data[c3]).to.be.an("array").and.not.be.empty;

      // Validar tipos
      data[c1].forEach((item) => {

        expect(item.slot).to.be.a("number");
        expect(item.type).to.be.an("object");
        expect(item.type.name).to.be.a("string");

      });

      // Validar habilidades
      data[c2].forEach((item) => {

        expect(item.is_hidden).to.be.a("boolean");
        expect(item.ability).to.be.an("object");
        expect(item.ability.name).to.be.a("string");

      });

      // Validar estadísticas
      data[c3].forEach((item) => {

        expect(item.base_stat).to.be.a("number");
        expect(item.stat).to.be.an("object");
        expect(item.stat.name).to.be.a("string");

      });

    });

  }
);