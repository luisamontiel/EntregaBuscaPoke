
Feature: Búsqueda de información de Pokémon
  Como usuario de la aplicación Poké-Busqueda
  Quiero consultar un Pokémon mediante su ID o nombre
  Para visualizar sus datos generales, tipos, habilidades y estadísticas

Background:
    Given que el usuario se encuentra en la página principal de búsqueda

  Scenario: Buscar un Pokémon existente por su ID
    When el usuario ingresa el ID "25" en el campo de búsqueda
    And hace clic en el botón "Buscar Pokémon"
    Then la API responde con un código de estado 200
    And se muestra el nombre "pikachu" en pantalla
    And se muestra el ID "25" en la información general

  Scenario: Buscar un Pokémon existente por su nombre
    When el usuario ingresa el nombre "CHARIZARD" en el campo de búsqueda
    And hace clic en el botón "Buscar Pokémon"
    Then la API responde con un código de estado 200
    And se muestra el nombre "charizard" y el ID "6"
    And se muestran los tipos "fire, flying"
    And se muestran las habilidades "blaze" y "solar-power"
    And se visualiza una lista con 6 estadísticas base

  Scenario: Mostrar mensaje de error cuando el Pokémon no existe
    When el usuario ingresa el nombre inexistente "pokemone" en el campo de búsqueda
    And hace clic en el botón "Buscar Pokémon"
    Then la API responde con un código de estado 404
    And se muestra el mensaje de error "Pokémon no encontrado"

Scenario: Validar la estructura y tipos de datos de la respuesta de un Pokémon existente
  When el usuario consulta un Pokémon válido con ID "1"
  Then la API responde con un código de estado 200
  And la respuesta contiene las propiedades "id", "name", "types", "abilities" y "stats"
  And el campo "id" es de tipo numérico
  And el campo "name" es una cadena de texto no vacía
  And los campos "types", "abilities" y "stats" son arreglos con sus tipos de datos internos válidos