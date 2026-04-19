import { Badge } from "../../../components/Badge";
import type { ClientRequestCard } from "../../../data/data";

interface Props {
  clientRequests: ClientRequestCard[];
  onSelect: (id: string) => void;
}

export const GridView = ({ clientRequests, onSelect }: Props) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {clientRequests.map((i) => (
      <div
        key={i.id}
        className="border rounded-xl p-4 flex flex-col gap-2 hover:shadow-md transition-shadow"
      >
        <p className="font-medium text-sm">{i.description}</p>
        <p className="text-xs text-gray-400">{i.addressRequest.city}</p>
        <div className="flex items-center justify-between mt-auto">
          <Badge
            label={i.isUrgent ? "Urgent" : "Non urgent"}
            color={i.isUrgent ? "red" : "green"}
          />
          <button
            onClick={() => onSelect(i.id)}
            className="text-xs text-amber-700 hover:underline"
          >
            Voir
          </button>
        </div>
      </div>
    ))}
  </div>
);