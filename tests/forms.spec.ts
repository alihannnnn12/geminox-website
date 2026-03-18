import { expect, test } from "@playwright/test";

test("newsletter form works in local preview mode", async ({ page }) => {
  await page.goto("/");
  await page.locator("#newsletter-email").fill("preview@example.com");
  await page.getByRole("button", { name: "Join Newsletter" }).click();

  await expect(page.getByText(/captured in local preview mode/i)).toBeVisible();
});

test("contact form returns placeholder success copy", async ({ page }) => {
  await page.goto("/contact");
  await page.locator("#contact-name").fill("Venue Booker");
  await page.locator("#contact-email").fill("booker@example.com");
  await page.locator("#contact-message").fill("Interested in a late-night support slot.");
  await page.getByRole("button", { name: "Send Inquiry" }).click();

  await expect(page.getByText(/inquiry captured in local preview mode/i)).toBeVisible();
});
