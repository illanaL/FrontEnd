interface Props {
  name: string;
  placeholder?: string;
  error?: string;
  type?: string;
  onChange: () => void;
  onBlure: () => void;
}

export function MyInput(props: Props) {
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={`${props.name}`}>{props.name}</label>
        <input {...props} className="input" type={props.type ?? "text"} />
        {props.error?.[props.name] && (
          <span className="text-red-500">
            {props.error?.[props.name]?.message}
          </span>
        )}
      </div>
    </>
  );
}
