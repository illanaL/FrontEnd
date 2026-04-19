// src/features/clientRequests/components/ClientRequestModal.tsx
import { Modal } from "../../../components/Modal";
import type { ClientRequestDetail } from "../../../data/data";

interface Props {
  clientRequest: ClientRequestDetail | null;
  onClose: () => void;
}

export const ClientRequestModal = ({ clientRequest, onClose }: Props) => {
  if (!clientRequest) return null;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Détail de l'intervention"
      footer={
        <button
          onClick={onClose}
          className="px-4 py-2 bg-amber-700 text-white text-sm rounded-lg hover:bg-amber-800"
        >
          Fermer
        </button>
      }
    >
      <p>{`Client : ${clientRequest.lastName} ${clientRequest.firstName}`}</p>
      <p>{`Date : ${clientRequest.createdAt.toLocaleDateString()}`}</p>
      <p>{`Description : ${clientRequest.description}`}</p>
      <p>{`Adresse : ${clientRequest.addressRequest.number} ${clientRequest.addressRequest.street}, ${clientRequest.addressRequest.city}`}</p>
    </Modal>
  );
};