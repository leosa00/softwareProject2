const { test, expect } = require("@playwright/test");

test("Page should load successfully", async ({ page }) => {
    await page.goto('http://localhost:7777'); 
    await expect(page).toHaveURL('http://localhost:7777');
});

test("Landing page should load with quiz title", async ({ page }) => {
    await page.goto('http://localhost:7777/');
    await expect(page.locator("h1")).toHaveText("Welcome to the Quiz Application");
});

test("Main page should have links for Topics, Home, Quiz, Login, and Register", async ({ page }) => {
    await page.goto('http://localhost:7777/');

    const link = page.locator('a[href="/"]');
    await expect(link).toHaveAttribute('href', '/');
});

test("Main page should have link for Quiz", async ({ page }) => {
    await page.goto('http://localhost:7777/');
    const link = page.locator('a[href="/quiz"]');
    await expect(link).toHaveAttribute('href', '/quiz');
});

test("Main page should have link for Login", async ({ page }) => {
    await page.goto('http://localhost:7777/');
    const link = page.locator('a[href="/auth/login"]');
    await expect(link).toHaveAttribute('href', '/auth/login');
});

test("Main page should have link for Register", async ({ page }) => {
    await page.goto('http://localhost:7777/');
    const link = page.locator('a[href="/auth/register"]');
    await expect(link).toHaveAttribute('href', '/auth/register');
});



test("Clicking next question should navigate correctly", async ({ page }) => {
    await page.goto('http://localhost:7777/quiz/12/questions/7/correct');
    await page.click('text=Next Question'); 
});


test("Successful registration redirects to login page", async ({ page }) => {
    await page.goto("http://localhost:7777/auth/register");
    await page.fill('input[name="email"]', 'test7@gmail.com'); 
    await page.fill('input[name="password"]', 'test');
    await page.click('button[type="submit"]');

    await page.waitForURL('http://localhost:7777/auth/login');
    expect(page.url()).toBe('http://localhost:7777/auth/login');
  });

  test("Login functionality should work", async ({ page }) => {
    await page.goto('http://localhost:7777/auth/login');

    await page.fill('input[name="email"]', 'test6@gmail.com'); 
    await page.fill('input[name="password"]', 'test');
    await page.click('button[type="submit"]');

    await page.waitForURL('http://localhost:7777/topics');
    expect(page.url()).toBe('http://localhost:7777/topics');

});



test("Page should contain specific text", async ({ page }) => {
    await page.goto('http://localhost:7777/quiz');
    await expect(page.locator("h1")).toHaveText("Quiz Topics");
});

