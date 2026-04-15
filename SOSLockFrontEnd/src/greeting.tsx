
interface GreetingProps {
  name: string;
   emoji?: string 
}

export function Greeting({ name, emoji }: GreetingProps) {
  return <h1>Bonjour, {name} {emoji} !</h1>;
}