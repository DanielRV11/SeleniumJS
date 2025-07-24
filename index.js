const caso1 = require("./caso1");
const caso2 = require("./caso2");
const caso3 = require("./caso3");
const caso4 = require("./caso4");
const caso5 = require("./caso5");
const caso6 = require("./caso6");

(async function ejecutarCasos() {
  console.log("Iniciando pruebas automatizadas de Riot Games...\n");

  await caso1();
  await caso2();
  await caso3();
  await caso4();
  await caso5();
  await caso6();

  console.log("\nTodas las pruebas han finalizado.");
})();
