const { Builder, By, until } = require("selenium-webdriver");

async function testTituloPagina() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://www.riotgames.com/es");

    // Esperar que el título esté presente
    await driver.wait(until.titleContains("Riot Games"), 10000);

    const titulo = await driver.getTitle();

    if (titulo.includes("Riot Games")) {
      console.log("✅ Título correcto:", titulo);
      await driver.sleep(5000);
    } else {
      console.log("❌ Título incorrecto:", titulo);
    }
  } catch (error) {
    console.error("❌ Error en la prueba:", error);
  } finally {
    await driver.quit();
  }
}

module.exports = testTituloPagina;
