

 import puppeteer from 'puppeteer';

 export async function POST(req: Request){
    const {url} = await req.json();
    const result = await checkSEO(url);
    return Response.json({result});
 }

async function checkSEO(url: any) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log('hi')
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const seoData = await page.evaluate(() => {
        const document :any = window.document;
        return {
            title: document.title || 'Title is missing',
            metaDescription: document.querySelector('meta[name="description"]')?.content || 'Meta description is missing',
            ogTitle: document.querySelector('meta[property="og:title"]')?.content || 'OG Title is missing',
            ogDescription: document.querySelector('meta[property="og:description"]')?.content || 'OG Description is missing',
            canonical: document.querySelector('link[rel="canonical"]')?.href || 'Canonical tag is missing',
            h1: document.querySelector('h1')?.innerText || 'H1 is missing',
            imagesWithAlt: [...document.querySelectorAll('img')].filter(img => img.alt).length,
            imagesWithoutAlt: [...document.querySelectorAll('img')].filter(img => !img.alt).length,
            noIndex: document.querySelector('meta[name="robots"]')?.content.includes('noindex') ? 'Page is set to noindex' : 'Indexable',
            linksCount: document.querySelectorAll('a').length
        };
    });
    console.log('SEO Report:', seoData);
 
    await browser.close();
    return seoData;
}
 
// const url = process.argv[2] || 'https://example.com';
// checkSEO(url);