//import "./App.css";
import { ProfileCard } from "./components/ProfileCard";
import { SignupArtisanForm } from "./components/SignupArtisanForm";
import { Add, Greeting } from "./greeting";

function App() {
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
