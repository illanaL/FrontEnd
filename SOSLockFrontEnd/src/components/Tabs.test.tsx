import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe' 
import 'vitest-axe/extend-expect'
import { Tabs } from './Tabs'
import { Accordion } from './Accordion'



test("le composant n'a aucune violation a11y", async () => {
    const changed = vi.fn()
  const { container } = render(

      <Tabs>
             <Tabs.Tab label="À traiter">
             1
             </Tabs.Tab>
     
             <Tabs.Tab label="En cours">
              2
             </Tabs.Tab>
     
             <Tabs.Tab label="Terminées">
              3
             </Tabs.Tab>
     
             <Tabs.Tab label="Vue Globale (Filtres)">
               <div className="flex flex-col gap-4 mb-6">
                 <input
                   type="text"
                   placeholder="Rechercher par nom..."
                   value="toto"
                   onChange={changed}
                   className="w-full border border-gray-200 rounded-lg px-4 py-2"
                 />
                               </div>
               opopopop
             </Tabs.Tab>
     
             <Tabs.Tab label="Profil">
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
             </Tabs.Tab>
           </Tabs>
     
  );

  const result = await axe(container);
  expect(result).toHaveNoViolations();
});