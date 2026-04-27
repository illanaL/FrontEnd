import { useRef } from "react";
import { Avatar } from "../components/AvatarTemp";
import { Badge } from "../components/Badge";
import { Card } from "../components/Card";
import { InfoRow } from "../components/InfoRow";
import { ProfileCard } from "../components/ProfileCard";
import { SkillList } from "../components/SkillList";
import { Add, Greeting } from "../greeting";
import { TextInput } from "../components/TextInput";
import { SelectInput } from "../components/SelectInput";
import { TextArea } from "../components/TextArea";
import { StepIndicator } from "../features/clientRequests/components/StepIndicator";

export const ExoPage = () => {
  const infos = [
    { label: "Email : ", value: "illana@bootcode.fr" },
    { label: "Ville : ", value: "Paris" },
    { label: "Expérience : ", value: "1 an" },
  ];

  const skillList: {
    label: string;
    color?: "blue" | "green" | "red" | "yellow";
  }[] = [
    { label: "TypeScript", color: "blue" },
    { label: "Node.js", color: "green" },
    { label: "Clean Archi", color: "yellow" },
    { label: "React", color: "red" },
  ];

  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return (
    <>
      <Greeting name="Bootcode" emoji="🚀" />
      <button onClick={scrollToBottom}>Créer votre compte artisan</button>
      <TextInput label="Prénom" placeholder="Jean" />
      <TextInput
        label="Email"
        type="email"
        placeholder="jean@mail.fr"
        error="Email invalide"
      />
      <SelectInput
        label="Langue"
        options={[
          { value: "fr", label: "Français" },
          { value: "en", label: "Anglais" },
          { value: "es", label: "Espagnol" },
        ]}
      />
      <TextArea
        label="Description du problème"
        placeholder="Décrivez votre problème..."
        rows={3}
      />
      <StepIndicator currentStep={0} /> // étape 1 active
      <StepIndicator currentStep={1} /> // étape 2 active
      <StepIndicator currentStep={2} /> // étape 3 active
      <StepIndicator currentStep={3} /> // étape 4 active
      <h1 className="text-center text-red-500 text-5xl">TEST</h1>
      <main className="min-h-screen bg-gray-50 flex items-start p-8">
        <ProfileCard
          name="Lahiany Illana"
          role="Développeuse FrontEnd"
          avatarSrc="https://api.dicebear.com/9.x/adventurer/svg?seed=Liliana"
          available={true}
          infos={infos}
          skills={skillList}
        />
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
        >
          <div className="w-full border-t pt-3 flex flex-col gap-1">
            {infos.map((t) => (
              <InfoRow key={t.label} label={t.label} value={t.value} />
            ))}
          </div>
          <div className="w-full border-t pt-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
              Compétences :
            </p>
            <SkillList skills={skillList} />
          </div>
        </Card>

        <Add />

        <div
          ref={bottomRef}
          className="bg-white rounded-2xl shadow-md p-8 w-full max-w-lg"
        >
          <h1 className="text-2xl font-bold text-slate-800 mb-1 text-center">
            Créer un compte artisan
          </h1>
          <p className="text-sm text-slate-400 mb-6 text-center">
            SOSLock — Rejoignez notre réseau
          </p>
        </div>
      </main>
    </>
  );
};
