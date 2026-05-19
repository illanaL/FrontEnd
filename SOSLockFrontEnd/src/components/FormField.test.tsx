import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe' 
import 'vitest-axe/extend-expect'
import { FormField } from './FormField'



test("le composant n'a aucune violation a11y", async () => {
  const { container } = render(
    <FormField
      label="Nom"
      placeholder="Dupont"
      error="Nom requis"
    />
  );

  const result = await axe(container);
  expect(result).toHaveNoViolations();
});