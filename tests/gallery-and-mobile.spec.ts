import { expect, test } from "@playwright/test";

test("gallery lightbox opens and closes", async ({ page }) => {
  await page.goto("/gallery");
  await page.getByRole("button", { name: /open-air session/i }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close lightbox" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("mobile menu can navigate to tour page", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Toggle menu" }).click();
  await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "Tour" }).click();

  await expect(page.getByRole("heading", { level: 1, name: /live dates, cleanly handled/i })).toBeVisible();
});
