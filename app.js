const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate-pdf', async (req, res) => {
  try {
    const htmlContent = req.body.htmlContent;

    //generate PDF from HTML
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf();
    await browser.close();

    //send the generated PDF as a response
    res.contentType('application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`html-to-pdf listening at port ${port}`);
});
