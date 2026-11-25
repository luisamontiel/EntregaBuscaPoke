#Poké-Búsqueda (Cypress + Cucumber + Allure)

---

# Requisitos previos
Antes de instalar y ejecutar el proyecto, asegúrate de contar con:
* Navegador **Google Chrome** instalado
* Conexión a internet para instalar dependencias y consultar la API pública (`https://pokeapi.co/v2).


# Pasos a seguir para la ejecución y generación del reporte

1. Extraer el zip BuscaPoke en una carpeta deseada
2. Abrir la ruta del proyecto en linea de comandos (cmd)
3. Instalar dependencias necesarias
npm ci 
4. Ejecutar pruebas
npx cypress run
5. Generar el reporte de pruebas
npm run allure:generate
6. Abrir reporte generado con Allure
npm run allure:open
