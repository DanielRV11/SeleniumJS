const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function caso6_CambiarIdioma() {
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(
      new chrome.Options().windowSize({ width: 1200, height: 800 })
    )
    .build();

  try {
    await driver.get("https://www.riotgames.com/es");

    // Hacer clic en el ícono del mundo para desplegar el menú
    const iconoIdioma = await driver.wait(
      until.elementLocated(
        By.css(
          'a[data-testid="riotbar:localeswitcher:button-toggleLocaleMenu"]'
        )
      ),
      10000
    );

    await driver.wait(until.elementIsVisible(iconoIdioma), 5000);
    await driver.executeScript("arguments[0].click();", iconoIdioma);

    // Esperar la opción "English (NA)"
    const englishOption = await driver.wait(
      until.elementLocated(
        By.css('a[data-testid="riotbar:localeswitcher:link-en"]')
      ),
      10000
    );

    await driver.wait(until.elementIsVisible(englishOption), 5000);
    await driver.executeScript(
      "arguments[0].scrollIntoView({behavior:'smooth', block:'center'})",
      englishOption
    );
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", englishOption);

    // Confirmar cambio de idioma
    await driver.wait(until.urlContains("/en"), 10000);

    console.log("✅ Caso 6: El idioma cambió correctamente a inglés");
    await driver.sleep(5000);
  } catch (error) {
    console.error("❌ Error en el Caso 6:", error);
  } finally {
    await driver.quit();
  }
}

module.exports = caso6_CambiarIdioma;
