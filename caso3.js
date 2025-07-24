const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function caso3_QuienesSomos() {
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(
      new chrome.Options().windowSize({ width: 1200, height: 800 })
    )
    .build();

  try {
    await driver.get("https://www.riotgames.com/es");

    await driver.executeScript("window.scrollTo(0, 0);");

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
      "arguments[0].scrollIntoView({behavior:'smooth', block:'center'});",
      quienesSomos
    );
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", quienesSomos);

    const ventanas = await driver.getAllWindowHandles();
    if (ventanas.length > 1) {
      await driver.switchTo().window(ventanas[1]);
      await driver.manage().window().maximize();
    }

    await driver.wait(until.urlContains("quienes-somos"), 10000);

    console.log("Caso 3: Se accedió a “Quiénes Somos” correctamente");
    await driver.sleep(5000);
  } catch (error) {
    console.error("Error en el Caso 3:", error);
  } finally {
    await driver.quit();
  }
}

module.exports = caso3_QuienesSomos;
