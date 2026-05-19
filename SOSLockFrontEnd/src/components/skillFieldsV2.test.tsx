import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe' 
import 'vitest-axe/extend-expect'

import { SkillsV2Field } from './SkillFieldsV2'



test("le composant n'a aucune violation a11y", async () => {
    const changed = vi.fn()
  const { container } = render(

      <SkillsV2Field
                      value={["1234", "123"]}
                      onChange= {changed}
                      error="erreur message"
                    />
  );

  const result = await axe(container);
  expect(result).toHaveNoViolations();
});