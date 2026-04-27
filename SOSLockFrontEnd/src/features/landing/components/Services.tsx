export const Services = () => {
  const services = [
    { icon: "🚨", title: "Porte bloquée", urgent: true },
    { icon: "🔑", title: "Clé perdue", urgent: true },
    { icon: "🪟", title: "Effraction", urgent: true },
    { icon: "🔒", title: "Changement serrure", urgent: false },
    { icon: "🏠", title: "Installation", urgent: false },
    { icon: "⚙️", title: "Volets roulants", urgent: false },
  ];

  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold text-teal-800 mb-12">
        Nos services
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {services.map((s, i) => (
          <div key={i} className="p-6 rounded-2xl border hover:shadow-lg transition">
            <div className="text-3xl mb-3">{s.icon}</div>
            <h3 className="font-bold text-teal-800">{s.title}</h3>

            <span className={`text-xs px-3 py-1 rounded-full mt-2 inline-block ${
              s.urgent ? "bg-red-100 text-red-600" : "bg-teal-100 text-teal-700"
            }`}>
              {s.urgent ? "Urgence" : "Rendez-vous"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};