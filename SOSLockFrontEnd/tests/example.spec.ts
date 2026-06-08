import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/admin');

  await expect(page.getByRole("heading",{name: "Trouvez un serrurier fiable en quelques minutes"})).toBeVisible();
});

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/artisans/signIn');
  await page.getByRole('textbox', { name: 'Téléphone' }).click();
  await page.getByRole('textbox', { name: 'Téléphone' }).fill('0649529341');
  await page.getByRole('textbox', { name: 'Mot de passe' }).click();
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('Abcd12!');
  await page.getByRole('textbox', { name: 'Mot de passe' }).press('Enter');
  await expect(page.getByRole("heading",{name: "Mes demandes assignées"})).toBeVisible();
});


