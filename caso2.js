const { Builder, By, until } = require("selenium-webdriver");

async function caso2_NavegarMenuNuestrosJuegos() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://www.riotgames.com/es");

    await driver.executeScript(
      "window.scrollTo(0, document.body.scrollHeight)"
    );

    await driver.wait(
      until.elementLocated(By.css("div.our-games__container")),
      10000
    );

    const enlaceJuego = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//div[contains(@class, 'our-games__container')]//a[.//img[contains(@src, 'lol-2024-kv.png')]]"
        )
      ),
      15000
    );

    await driver.wait(until.elementIsVisible(enlaceJuego), 5000);

    await driver.executeScript(
      "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
      enlaceJuego
    );

    await driver.sleep(500);

    await driver.executeScript("arguments[0].click();", enlaceJuego);

    const ventanas = await driver.getAllWindowHandles();
    if (ventanas.length > 1) {
      await driver.switchTo().window(ventanas[1]);
    }

    await driver.wait(until.urlContains("leagueoflegends.com"), 10000);

    const urlActual = await driver.getCurrentUrl();

    if (urlActual.includes("leagueoflegends.com")) {
      console.log(
        "Caso 2: Navegó correctamente a la página de League of Legends."
      );
      await driver.sleep(5000);
    } else {
      console.log("Caso 2: No se navegó correctamente a la página del juego.");
    }
  } catch (error) {
    console.error("Error en el Caso 2:", error);
  } finally {
    await driver.quit();
  }
}

module.exports = caso2_NavegarMenuNuestrosJuegos;
