const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function caso4_LogoRedireccion() {
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(
      new chrome.Options().windowSize({ width: 1200, height: 800 })
    )
    .build();

  try {
    await driver.get("https://www.riotgames.com/es");

    // Scroll al top para que se vea la barra
    await driver.executeScript("window.scrollTo(0, 0);");

    // Buscar enlace "Quiénes somos" como en el caso 3
    const quienesSomos = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//a[p[contains(translate(text(),'QUIÉNES SOMOS','quiénes somos'),'quiénes somos')]]"
        )
      ),
      10000
    );

    await driver.wait(until.elementIsVisible(quienesSomos), 5000);
    await driver.executeScript(
      "arguments[0].scrollIntoView({behavior:'smooth', block:'center'})",
      quienesSomos
    );
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", quienesSomos);

    // Cambiar a nueva pestaña si se abre
    const ventanas = await driver.getAllWindowHandles();
    if (ventanas.length > 1) {
      await driver.switchTo().window(ventanas[1]);
      await driver.manage().window().maximize();
    }

    // Confirmar que estamos en la sección de "quiénes somos"
    await driver.wait(until.urlContains("quienes-somos"), 10000);

    // Buscar y hacer clic en el logo para volver al inicio
    const logo = await driver.wait(
      until.elementLocated(
        By.css('a[data-testid="riotbar:header:themeLogo-desktop"]')
      ),
      10000
    );

    await driver.wait(until.elementIsVisible(logo), 5000);
    await driver.executeScript("arguments[0].click();", logo);

    // Verificar que se redirige a la página principal
    await driver.wait(until.urlContains("/es"), 10000);

    console.log(
      "✅ Caso 4: Redireccionó al inicio correctamente al hacer clic en el logo"
    );
    await driver.sleep(5000);
  } catch (error) {
    console.error("❌ Error en el Caso 4:", error);
  } finally {
    await driver.quit();
  }
}

module.exports = caso4_LogoRedireccion;
