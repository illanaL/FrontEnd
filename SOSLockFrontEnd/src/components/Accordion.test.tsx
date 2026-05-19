import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe' 
import 'vitest-axe/extend-expect'
import { Accordion } from './Accordion'



test("le composant n'a aucune violation a11y", async () => {
  const { container } = render(
     <Accordion>
                <Accordion.Item value="info-perso">
                  <Accordion.Trigger value="info-perso">
                    Informations personnelles
                  </Accordion.Trigger>
                  <Accordion.Content value="info-perso">
                    Email : Illana@bootcode.from Adresse : 11 allee des magnolias
                    Villemomble Tel : 0612456789
                  </Accordion.Content>
                </Accordion.Item>
    
                <Accordion.Item value="infos-entreprise">
                  <Accordion.Trigger value="infos-entreprise">
                    Informations Entreprises
                  </Accordion.Trigger>
                  <Accordion.Content value="infos-entreprise">
                    Nom de la société : JTP Serrurier Siret : 789456123 Addresse : 1
                    rue telma Aix
                  </Accordion.Content>
                </Accordion.Item>
    
                <Accordion.Item value="competences">
                  <Accordion.Trigger value="competences">
                    Compétences
                  </Accordion.Trigger>
                  <Accordion.Content value="competences">
                    Serrurerie, Blindage, Dépannage
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
  );

  const result = await axe(container);
  expect(result).toHaveNoViolations();
});