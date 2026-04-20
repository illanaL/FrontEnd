import { useEffect, useState } from "react"

type User = {
  id: number
  name: string
  username: string
}

type UserState = {
  users: User[]
  loading: boolean
  error: string | null
}

export function UserList() {
  const [state, setState] = useState<UserState>({
    users: [],
    loading: true,
    error: null
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setState(prev => ({
          ...prev,
          loading: true,
          error: null
        }))

        const res = await fetch("https://jsonplaceholder.typicode.com/users")

        if (!res.ok) {
          throw new Error("Erreur serveur")
        }

        const data: User[] = await res.json()

        setState({
          users: data,
          loading: false,
          error: null
        })

      } catch (error: any) {
        setState({
          users: [],
          loading: false,
          error: error.message
        })
      }
    }

    fetchUsers()
  }, [])

  // 🔄 loading
  if (state.loading) {
    return <p>Loading...</p>
  }

  // ❌ erreur
  if (state.error) {
    return <p className="text-red-500">Erreur : {state.error}</p>
  }

  // 📭 vide
  if (state.users.length === 0) {
    return <p>Pas d'utilisateurs à afficher</p>
  }

  // ✅ succès
  return (
    <table className="border border-gray-300">
      <thead>
        <tr>
          <th className="border px-2">ID</th>
          <th className="border px-2">Name</th>
          <th className="border px-2">Username</th>
        </tr>
      </thead>
      <tbody>
        {state.users.map((u) => (
          <tr key={u.id}>
            <td className="border px-2">{u.id}</td>
            <td className="border px-2">{u.name}</td>
            <td className="border px-2">{u.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}