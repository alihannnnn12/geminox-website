import { expect, test } from "@playwright/test";

test("desktop navigation reaches the main routes", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /late-night pressure/i })).toBeVisible();

  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Music" }).click();
  await expect(page.getByRole("heading", { level: 1, name: /release page built to scale/i })).toBeVisible();

  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "EPK" }).click();
  await expect(page.getByRole("heading", { level: 1, name: /one-stop page for promoters and press/i })).toBeVisible();

  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Contact" }).click();
  await expect(page.getByRole("heading", { level: 1, name: /direct line for clubs, promoters, labels, and collaborators/i })).toBeVisible();
});
