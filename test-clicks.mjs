import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Emulate mobile
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  
  await page.goto('http://localhost:3000/templates');
  await page.waitForSelector('button');
  
  console.log('Page loaded. Clicking Preview button...');
  
  // Find the first Preview button
  const buttons = await page.$$('button');
  let previewBtn = null;
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('Preview')) {
      previewBtn = btn;
      break;
    }
  }
  
  if (previewBtn) {
    await previewBtn.click();
    console.log('Clicked preview button.');
    
    // Check if modal opens
    await new Promise(r => setTimeout(r, 1000));
    const modals = await page.$$('div.fixed.inset-0.z-50');
    console.log(`Modals found: ${modals.length}`);
  } else {
    console.log('Preview button not found!');
  }
  
  await browser.close();
})();
