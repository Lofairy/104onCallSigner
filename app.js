require('chromedriver');
const {Builder, By, until, Key} = require('selenium-webdriver');
const rsaCrypto = require('./utils/rsa-crypto');

let autoOncallSign = async () => {
    let driver = new Builder()
        .forBrowser('chrome')
        .build();

    let pw = ''; // <= type your password that enccrypt by utils.privateEncrypt();

    await driver.get('http://sysblog.104.com.tw/index.php');
    await driver.findElement(By.id('portalid')).sendKeys('vincent.lin');
    await driver.findElement(By.id('pwd')).sendKeys(rsaCrypto.publicDecrypt(pw));
    await driver.findElement(By.id('button')).click();
    await driver.wait(until.elementLocated(By.css('#left > dl:nth-child(4) > dt.checkin_dev > a')), 10 * 1000);
    await driver.findElement(By.css('#left > dl:nth-child(4) > dt.checkin_dev > a')).click();
    await driver.wait(until.elementLocated(By.css('input[name="aaa"][type=button][value="人員簽到"]')), 10 * 1000);
    await driver.findElement(By.css('input[name="aaa"][type=button][value="人員簽到"]')).click();
    await driver.sleep(2 * 1000);
    driver.quit();
};
autoOncallSign();