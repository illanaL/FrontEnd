import { useState } from "react";

interface GreetingProps {
  name: string;
  emoji?: string;
}

export function Greeting({ name, emoji }: GreetingProps) {
  return (
    <h1 className="text-center">
      Bonjour, {name} {emoji} !
    </h1>
  );
}

export function Add() {
  const [todos, setTodos] = useState<string[]>([
    "Apprendre React",
    "Comprendre useState",
    "Faire les exercices",
  ]);
  const addTodo = () => {
    setTodos([...todos, "Commiter le code"]);
  };
  const deleteTodo = () => {
    setTodos(todos.filter((todo) => todo !== "Faire les exercices"));
  };
  const updateTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo === "Apprendre React" ? "Maîtriser React" : todo,
      ),
    );
  };
  return (
    <>
      <button
        onClick={addTodo}
        className="w-full border-4 pt-3 flex flex-col gap-1 rounded-full "
      >
        Ajouter
      </button>
      <button
        onClick={deleteTodo}
        className="w-full border-4 pt-3 flex flex-col gap-1 rounded-full "
      >
        Supprimer
      </button>
      <button
        onClick={updateTodo}
        className="w-full border-4 pt-3 flex flex-col gap-1 rounded-full "
      >
        Modifier
      </button>
      <ul className="mt-4 flex flex-col gap-2">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="bg-white border rounded-lg px-4 py-2 text-sm"
          >
            {todo}
          </li>
        ))}
      </ul>
    </>
  );
}
