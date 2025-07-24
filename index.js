const caso1 = require("./caso1");

(async function ejecutarCasos() {
  console.log("🚀 Iniciando pruebas automatizadas de Riot Games...\n");

  await caso1();

  console.log("\n✅ Todas las pruebas han finalizado.");
})();
