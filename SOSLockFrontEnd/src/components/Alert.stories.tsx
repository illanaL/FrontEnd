import { Alert } from "./Alert"

export default { title: 'Components/Alert', component: Alert }

export const Info = () => (
  <Alert variant="info">
    Votre profil a été mis à jour.
  </Alert>
)

export const Error = () => (
  <Alert variant="error" onDismiss={() => {}}>
    Impossible de sauvegarder. Veuillez réessayer.
  </Alert>
)

export const AllVariants = () => (
  <div className="space-y-4">
    {(['info', 'success', 'warning', 'error'] as const).map((v) => (
      <Alert key={v} variant={v}>Exemple {v}</Alert>
    ))}
  </div>
)