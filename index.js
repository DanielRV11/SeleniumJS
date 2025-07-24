const caso1 = require("./caso1");
const caso2 = require("./caso2");

(async function ejecutarCasos() {
  console.log("🚀 Iniciando pruebas automatizadas de Riot Games...\n");

  await caso1();
  await caso2();

  console.log("\n✅ Todas las pruebas han finalizado.");
})();
