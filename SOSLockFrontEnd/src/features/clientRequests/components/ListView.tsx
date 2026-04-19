import { Badge } from "../../../components/Badge";
import type { ClientRequestCard } from "../../../data/data";

interface Props {
  clientRequests: ClientRequestCard[];
  onSelect: (id: string) => void;
}

export const ListView = ({ clientRequests, onSelect }: Props) => (
  <div className="flex flex-col gap-3">
    {clientRequests.map((i) => (
      <div
        key={i.id}
        className="border rounded-xl px-4 py-3 flex items-center justify-between hover:shadow-sm transition-shadow"
      >
        <div className="flex items-center gap-3">
          <Badge
            label={i.isUrgent ? "Urgent" : "Non urgent"}
            color={i.isUrgent ? "red" : "green"}
          />
          <div>
            <p className="text-sm font-medium">{i.description} — {i.addressRequest.city}</p>
            <p className="text-xs text-gray-400">
              {i.lastName} {i.firstName} · {i.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
        <button
          onClick={() => onSelect(i.id)}
          className="px-4 py-2 bg-amber-700 text-white text-sm rounded-lg hover:bg-amber-800"
        >
          Voir
        </button>
      </div>
    ))}
  </div>
);