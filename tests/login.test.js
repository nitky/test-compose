const target_url = process.env.TARGET_URL;

describe('Wordpress Test Cases', () => {
  beforeAll(async () => {
    await page.goto(target_url);
  });

  test('It appears "Log In" in Log-in title.', async () => {
    expect(await page.title()).toMatch("Log In");
  });

  test('Admin Log-in.', async () => {
    await page.type('input[name="log"]', 'admin');
    await page.type('input[name="pwd"]', 'changeme');
    await page.evaluate(() => {
      document.querySelector('input[type="submit"]').click();
    });
    await page.waitForNavigation({
      waitUntil: 'domcontentloaded'
    });
    expect(await page.title()).toMatch("Dashboard");
  });
});

