import React, {
  useState,
  type PropsWithChildren,
  type ReactElement,
} from "react";

interface TabProps {
  label: string;
  isActive?: boolean;
  index?: number;
  onSelect?: () => void;
}

function Tab({ label, isActive, onSelect }: PropsWithChildren<TabProps>) {
  return (
    <>
      <button
        onClick={onSelect}
        className={`px-4 py-2 text-sm font-medium border-b-2 ${
          isActive
            ? "text-[#BA7517] border-[#BA7517]"
            : "text-gray-500 border-transparent"
        }`}
      >
        {label}
      </button>
    </>
  );
}

export function Tabs({ children }: PropsWithChildren) {
  const [active, setActive] = useState(0);
  const tabs = React.Children.toArray(children) as ReactElement<
    PropsWithChildren<TabProps>
  >[];
  return (
    <>
      <div>
        <div className="flex gap-1 border-b mb-4">
          {React.Children.map(children, (child, index) =>
            React.cloneElement(child as ReactElement<TabProps>, {
              isActive: active === index,
              onSelect: () => setActive(index),
            }),
          )}
        </div>
        <div className="mt-4">{tabs[active].props.children}</div>
      </div>
    </>
  );
}

Tabs.Tab = Tab;
