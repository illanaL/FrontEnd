import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe' 
import 'vitest-axe/extend-expect'
import { Card } from './Card'
import { Avatar } from './AvatarTemp'
import { Badge } from './Badge'



test("le composant n'a aucune violation a11y", async () => {
  const { container } = render(
       <Card
               title={
                 <>
                   <Avatar
                     src="https://api.dicebear.com/9.x/adventurer/svg?seed=Liliana"
                     size={64}
                   />
                   <div>
                     <h2 className="font-semibold text-lg">Lahiany Illana</h2>
                     <p className="text-sm text-gray-500">Développeuse FrontEnd</p>
                     <Badge label="Disponible" color="green" />
                   </div>
                 </>
               }
             ></Card>
  );

  const result = await axe(container);
  expect(result).toHaveNoViolations();
});