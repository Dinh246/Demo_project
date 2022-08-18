import { expect } from '@playwright/test'
import { test } from '../../MyFixtures/Homepage'

test('test homepage', async ({ page }) => {
    await expect(page).toHaveURL(/.*select/)
})