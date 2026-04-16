//import "./App.css";
import { Avatar } from "./components/AvatarTemp";
import { Badge } from "./components/Badge";
import { Card } from "./components/Card";
import { InfoRow } from "./components/InfoRow";
import { ProfileCard } from "./components/ProfileCard";
import { SignupArtisanForm } from "./components/SignupArtisanForm";
import { SkillList } from "./components/SkillList";
import { Add, Greeting } from "./greeting";

function App() {

  const infos = [
    { label: "Email : ", value: "illana@bootcode.fr" },
    { label: "Ville : ", value: "Paris" },
    { label: "Expérience : ", value: "1 an" },
  ]
  const skillList: {
    label: string;
    color?: "blue" | "green" | "red" | "yellow";
  }[] = [
      { label: "TypeScript", color: "blue" },
      { label: "Node.js", color: "green" },
      { label: "Clean Archi", color: "yellow" },
      { label: "React", color: "red" },
    ]


  return (
    <>
      <Greeting name="Bootcode" emoji="🚀" />
      <h1 className="text-center text-red-500 text-5xl">TEST</h1>
      <main className="min-h-screen bg-gray-50 flex items-start p-8">
        <ProfileCard
          name="Lahiany Illana"
          role="Développeuse FrontEnd"
          avatarSrc="https://api.dicebear.com/9.x/adventurer/svg?seed=Liliana"
          available={true}
          infos={[
            { label: "Email : ", value: "illana@bootcode.fr" },
            { label: "Ville : ", value: "Paris" },
            { label: "Expérience : ", value: "1 an" },
          ]}
          skills={[
            { label: "TypeScript", color: "blue" },
            { label: "Node.js", color: "green" },
            { label: "Clean Archi", color: "yellow" },
            { label: "React", color: "red" },
          ]}
        />
        <Card
          header={(
            <>
              <Avatar src="https://api.dicebear.com/9.x/adventurer/svg?seed=Liliana" size={64} />
              <div>
                <h2 className="font-semibold text-lg">Lahiany Illana</h2>
                <p className="text-sm text-gray-500">Développeuse FrontEnd</p>
                <Badge label="Disponible" color="green" />
              </div>
            </>
          )

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


        <Add></Add>
        <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-lg">
          <h1 className="text-2xl font-bold text-slate-800 mb-1 text-center">
            Créer un compte artisan
          </h1>
          <p className="text-sm text-slate-400 mb-6 text-center">
            SOSLock — Rejoignez notre réseau
          </p>
          <SignupArtisanForm />
        </div>
      </main>
    </>
  );
}

export default App;
