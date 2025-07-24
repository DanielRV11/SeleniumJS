const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function caso5_RedesSociales() {
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(
      new chrome.Options().windowSize({ width: 1200, height: 800 })
    )
    .build();

  try {
    await driver.get("https://www.riotgames.com/es");

    await driver.executeScript(
      "window.scrollTo(0, document.body.scrollHeight);"
    );
    await driver.sleep(1000);

    const enlaceInstagram = await driver.wait(
      until.elementLocated(By.css('a[href*="instagram.com"]')),
      10000
    );

    await driver.wait(until.elementIsVisible(enlaceInstagram), 5000);
    await driver.executeScript(
      "arguments[0].scrollIntoView({behavior:'smooth', block:'center'})",
      enlaceInstagram
    );
    await driver.sleep(500);

    await driver.executeScript("arguments[0].click();", enlaceInstagram);

    const tabs = await driver.getAllWindowHandles();
    if (tabs.length < 2) {
      throw new Error("No se abrió una nueva pestaña");
    }

    await driver.switchTo().window(tabs[1]);

    const url = await driver.getCurrentUrl();
    if (url.includes("instagram.com")) {
      console.log("Caso 5: Redirige correctamente a Instagram:", url);
      await driver.sleep(5000);
    } else {
      console.log("Caso 5: No redirige correctamente:", url);
    }
  } catch (error) {
    console.error("Error en el Caso 5:", error);
  } finally {
    await driver.quit();
  }
}

module.exports = caso5_RedesSociales;
