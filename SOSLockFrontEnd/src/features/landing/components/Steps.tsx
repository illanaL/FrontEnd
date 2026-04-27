export const Steps = () => {
  const steps = [
    "Décrivez votre problème",
    "On trouve un artisan",
    "Intervention rapide",
  ];

  return (
    <section className="py-20 bg-teal-50 text-center">
      <h2 className="text-3xl font-bold text-teal-800 mb-12">
        Comment ça marche ?
      </h2>

      <div className="flex flex-col md:flex-row justify-center gap-10">
        {steps.map((text, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-teal-700 text-white font-bold mb-4">
              {i + 1}
            </div>
            <p className="text-gray-600">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};