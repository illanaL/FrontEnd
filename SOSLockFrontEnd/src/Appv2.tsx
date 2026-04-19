import { Accordion } from "./components/Accordion";
import { Badge } from "./components/Badge";
import { Card } from "./components/Card";
import { Modal } from "./components/Modal";
import { Tabs } from "./components/Tabs";
import { useState } from "react";
import { Alert } from "./components/Alert";
import { StatsGrid } from "./components/StatsGrid";
import { mockClientRequest } from "./data/data";

function App() {
   

  const [modalOuverte, setModalOuverte] = useState<string | null>(null);

 
  const [search, setSearch] = useState("");
  const [filterUrgent, setFilterUrgent] = useState<boolean | null>(null);

  const allFiltered = mockClientRequest.filter((i) => {
    const matchSearch = `${i.firstName} ${i.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchUrgent = filterUrgent === null || i.isUrgent === filterUrgent;
    return matchSearch && matchUrgent;
  });

   const pending = allFiltered.filter((i) => i.status === "PENDING");
  const assigned = allFiltered.filter((i) => i.status === "ASSIGNED");
  const completed = allFiltered.filter((i) => i.status === "COMPLETED");

  const stats = [
    { label: "En attente", value: pending.length, color: "yellow" as const },
    { label: "En cours", value: assigned.length, color: "blue" as const },
    { label: "Terminées", value: completed.length, color: "green" as const },
    { label: "Total", value: mockClientRequest.length, color: "red" as const },
  ];
  return (
    <>
      <div className="p-8">
        <Tabs>
          <Tabs.Tab label="Interventions en attente de prise en charge (CARD)">
            <div className="">
              Interventions en cours
              <Badge label="3 en attente" color="yellow"></Badge>
            </div>

            <Card title="Porte claquée-Aix les bains" variant="elevated">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge label="urgent" color="red"></Badge>
                  <p className="text-sm text-gray-500">
                    - Mme LAHIANY Ghislaine - 19/04/2026
                  </p>
                </div>
                <button
                  className="px-4 py-2 bg-amber-700 text-white text-sm font-medium rounded-lg hover:bg-amber-800"
                  onClick={() => setModalOuverte("1")}
                >
                  Voir
                </button>
              </div>

              <Modal
                isOpen={modalOuverte === "1"}
                onClose={() => setModalOuverte(null)}
                title="Détail"
              >
                <p>Client: Mme LAHIANY Ghislaine </p>
                <p>Date de la demande: 19/04/2026</p>
                <p>
                  Description : Porte claquée suite à un courant d'air,clés sur
                  la serrure
                </p>
                <button
                  className="px-4 py-2 bg-amber-700 text-white text-sm font-medium rounded-lg hover:bg-amber-800"
                  name="fermer"
                  onClick={() => setModalOuverte(null)}
                >
                  Fermer
                </button>
              </Modal>
            </Card>
            <Card title="Volet roulant à réparer-Paris" variant="outlined">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge label="normal" color="green"></Badge>
                  <p className="text-sm text-gray-500">
                    - Mr Marciano - 19/04/2026
                  </p>
                </div>
                <button
                  className="px-4 py-2 bg-amber-700 text-white text-sm font-medium rounded-lg hover:bg-amber-800"
                  onClick={() => setModalOuverte("2")}
                >
                  Voir
                </button>
              </div>

              <Modal
                isOpen={modalOuverte === "2"}
                onClose={() => setModalOuverte(null)}
                title="Détail"
              >
                <p>Client: Mr Marciano Jean Pierre </p>
                <p>Date de la demande: 19/04/2026</p>
                <p>
                  Description : Volet roulant fermée impossible de l'ouvrir,
                  nous sommes dans la pénombre
                </p>
                <button
                  className="px-4 py-2 bg-amber-700 text-white text-sm font-medium rounded-lg hover:bg-amber-800"
                  name="fermer"
                  onClick={() => setModalOuverte(null)}
                >
                  Fermer
                </button>
              </Modal>
            </Card>
            <Card title="Digicode interphone-Gagny" variant="default">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge label="normal" color="green"></Badge>
                  <p className="text-sm text-gray-500">
                    - Syndic les Floralies - 19/04/2026
                  </p>
                </div>
                <button
                  className="px-4 py-2 bg-amber-700 text-white text-sm font-medium rounded-lg hover:bg-amber-800"
                  onClick={() => setModalOuverte("3")}
                >
                  Voir
                </button>
              </div>

              <Modal
                isOpen={modalOuverte === "3"}
                onClose={() => setModalOuverte(null)}
                title="Détail"
              >
                <p>Client: Syndic- Les Floralies </p>
                <p>Date de la demande: 19/04/2026</p>
                <p>
                  Description : Mise en place d'un digicode pour l'immeumble tel
                  addresse.
                </p>
                <button
                  className="px-4 py-2 bg-amber-700 text-white text-sm font-medium rounded-lg hover:bg-amber-800"
                  name="fermer"
                  onClick={() => setModalOuverte(null)}
                >
                  Fermer
                </button>
              </Modal>
            </Card>
          </Tabs.Tab>
          <Tabs.Tab label="Intervention en cours (MOCKCLientRequest)">
            <Alert variant="warning">
              {" "}
              Vous avez {pending.length} demandes en attente de prise en charge
            </Alert>

            {pending.map((intervention) => (
              <Card
                key={intervention.id}
                title={`${intervention.description} - ${intervention.addressRequest.city}`}
                variant="elevated"
              >
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      label={intervention.isUrgent ? "urgent" : "Non urgent"}
                      color={intervention.isUrgent ? "red" : "green"}
                    />
                    <p className="text-sm text-gray-500">
                      {intervention.lastName} {intervention.firstName} -{" "}
                      {intervention.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 bg-amber-700 text-white text-sm font-medium rounded-lg hover:bg-amber-800"
                    onClick={() => setModalOuverte(intervention.id)}
                  >
                    Voir
                  </button>
                </div>
                <Modal
                  isOpen={modalOuverte === intervention.id}
                  onClose={() => setModalOuverte(null)}
                  title="Détail"
                >
                  <p>
                    {" "}
                    {`Client : ${intervention.lastName} ${intervention.firstName}`}{" "}
                  </p>
                  <p>{`Date : ${intervention.createdAt.toLocaleDateString()}`}</p>
                  <p> {`Description : ${intervention.description}`}</p>
                  <button
                    className="px-4 py-2 bg-amber-700 text-white text-sm font-medium rounded-lg hover:bg-amber-800"
                    onClick={() => setModalOuverte(null)}
                  >
                    Fermer
                  </button>
                </Modal>
              </Card>
            ))}
          </Tabs.Tab>
          <Tabs.Tab label="Vos interventions en cours">
            <Alert variant="info">
              {" "}
              Vous avez {assigned.length} interventions en cours non terminées
            </Alert>

            {assigned.map((intervention) => (
              <Card
                key={intervention.id}
                title={`${intervention.description} - ${intervention.addressRequest.city}`}
                variant="elevated"
              >
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      label={intervention.isUrgent ? "urgent" : "Non urgent"}
                      color={intervention.isUrgent ? "red" : "green"}
                    />
                    <p className="text-sm text-gray-500">
                      {intervention.lastName} {intervention.firstName} -{" "}
                      {intervention.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 bg-amber-700 text-white text-sm font-medium rounded-lg hover:bg-amber-800"
                    onClick={() => setModalOuverte(intervention.id)}
                  >
                    Voir
                  </button>
                </div>
                <Modal
                  isOpen={modalOuverte === intervention.id}
                  onClose={() => setModalOuverte(null)}
                  title="Détail"
                >
                  <p>
                    {" "}
                    {`Client : ${intervention.lastName} ${intervention.firstName}`}{" "}
                  </p>
                  <p>{`Date : ${intervention.createdAt.toLocaleDateString()}`}</p>
                  <p> {`Description : ${intervention.description}`}</p>
                  <button
                    className="px-4 py-2 bg-amber-700 text-white text-sm font-medium rounded-lg hover:bg-amber-800"
                    onClick={() => setModalOuverte(null)}
                  >
                    Fermer
                  </button>
                </Modal>
              </Card>
            ))}
          </Tabs.Tab>
          <Tabs.Tab label="Inteventions Terminées">
            <Alert variant="success">
              {" "}
              Vous avez {completed.length} interventions terminées
            </Alert>

            {completed.map((intervention) => (
              <Card
                key={intervention.id}
                title={`${intervention.description} - ${intervention.addressRequest.city}`}
                variant="elevated"
              >
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      label={intervention.isUrgent ? "urgent" : "Non urgent"}
                      color={intervention.isUrgent ? "red" : "green"}
                    />
                    <p className="text-sm text-gray-500">
                      {intervention.lastName} {intervention.firstName} -{" "}
                      {intervention.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 bg-amber-700 text-white text-sm font-medium rounded-lg hover:bg-amber-800"
                    onClick={() => setModalOuverte(intervention.id)}
                  >
                    Voir
                  </button>
                </div>
                <Modal
                  isOpen={modalOuverte === intervention.id}
                  onClose={() => setModalOuverte(null)}
                  title="Détail"
                >
                  <p>
                    {" "}
                    {`Client : ${intervention.lastName} ${intervention.firstName}`}{" "}
                  </p>
                  <p>{`Date : ${intervention.createdAt.toLocaleDateString()}`}</p>
                  <p> {`Description : ${intervention.description}`}</p>
                  <button
                    className="px-4 py-2 bg-amber-700 text-white text-sm font-medium rounded-lg hover:bg-amber-800"
                    onClick={() => setModalOuverte(null)}
                  >
                    Fermer
                  </button>
                </Modal>
              </Card>
            ))}
          </Tabs.Tab>
          <Tabs.Tab label="Toutes les interventions + filtre">
            <StatsGrid stats={stats} />
            <input
              type="text"
              placeholder="rechercher une demande"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mb-4"
            />
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setFilterUrgent(null)}
                className={`px-3 py-1 rounded-lg text-sm border ${filterUrgent === null ? "bg-amber-700 text-white" : "text-gray-500"}`}
              >
                Tous
              </button>
              <button
                onClick={() => setFilterUrgent(true)}
                className={`px-3 py-1 rounded-lg text-sm border ${filterUrgent === true ? "bg-red-600 text-white" : "text-gray-500"}`}
              >
                Urgent
              </button>
              <button
                onClick={() => setFilterUrgent(false)}
                className={`px-3 py-1 rounded-lg text-sm border ${filterUrgent === false ? "bg-green-600 text-white" : "text-gray-500"}`}
              >
                Non urgent
              </button>
            </div>

            {allFiltered.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">
                Aucun résultat trouvé
              </p>
            ) : (
              allFiltered.map((intervention) => (
                <Card
                  key={intervention.id}
                  title={`${intervention.description} — ${intervention.addressRequest.city}`}
                  variant="default"
                >
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        label={intervention.isUrgent ? "Urgent" : "Non urgent"}
                        color={intervention.isUrgent ? "red" : "green"}
                      />
                      <p className="text-sm text-gray-500">
                        {intervention.lastName} {intervention.firstName} ·{" "}
                        {intervention.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      className="px-4 py-2 bg-amber-700 text-white text-sm font-medium rounded-lg hover:bg-amber-800"
                      onClick={() => setModalOuverte(intervention.id)}
                    >
                      Voir
                    </button>
                  </div>
                  <Modal
                    isOpen={modalOuverte === intervention.id}
                    onClose={() => setModalOuverte(null)}
                    title="Détail"
                  >
                    <p>{`Client : ${intervention.lastName} ${intervention.firstName}`}</p>
                    <p>{`Date : ${intervention.createdAt.toLocaleDateString()}`}</p>
                    <p>{`Description : ${intervention.description}`}</p>
                    <button
                      className="px-4 py-2 bg-amber-700 text-white text-sm font-medium rounded-lg hover:bg-amber-800"
                      onClick={() => setModalOuverte(null)}
                    >
                      Fermer
                    </button>
                  </Modal>
                </Card>
              ))
            )}
          </Tabs.Tab>
          <Tabs.Tab label="Profil">
            <Accordion>
              <Accordion.Item title="Informations personnelles">
                Email : Illana@bootcode.from Adresse : 11 allee des magnolias
                Villemomble Tel : 0612456789
              </Accordion.Item>
              <Accordion.Item title="Informations Entreprises">
                Nom de la société : JTP Serrurier Siret : 789456123 Addresse : 1
                rue telma Aix
              </Accordion.Item>
              <Accordion.Item title="Compétences">
                Serrurerie, Blindage, Dépannage
              </Accordion.Item>
            </Accordion>
          </Tabs.Tab>
        </Tabs>
      </div>
    </>
  );
}
export default App;
