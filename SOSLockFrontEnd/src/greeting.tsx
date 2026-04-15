
interface GreetingProps {
  name: string;
   emoji?: string 
}

export function Greeting({ name, emoji }: GreetingProps) {
  return <h1 className="text-center">Bonjour, {name} {emoji} !</h1>;
}