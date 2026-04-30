import { useState } from "react";
import "./App.css";
import { useCreatePost } from "./hook/useCreatePost";
import { useDeletePost } from "./hook/useDeletePost";
import { usePost } from "./hook/usePost";
import { usePosts } from "./hook/usePosts";

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data, isLoading, isError } = usePosts();
  const { mutate } = useCreatePost();
  const { mutate: deletePost } = useDeletePost();
  const { data: postDetail } = usePost(selectedId ?? 0);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  console.log("selectedId:", selectedId);
  console.log("postDetail:", postDetail);
  console.log(data);

  return (
    <div>
      <h1>Posts</h1>
      <button
        onClick={() =>
          mutate({ title: "New post", body: "Hello world-Illana" })
        }
      >
        Ajouter un post
      </button>
      {Array.isArray(data) &&
        data.map((post: any) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <button onClick={() => setSelectedId(post.id)}>Voir détail</button>
            <button onClick={() => deletePost(post.id)}>Effacer</button>
          </div>
        ))}

      {selectedId && postDetail && (
        <div>
          <h2>Détail du post</h2>
          <p>
            <strong>ID:</strong> {postDetail.id}
          </p>
          <p>
            <strong>Titre:</strong> {postDetail.title}
          </p>
          <p>
            <strong>Contenu:</strong> {postDetail.body}
          </p>

          <button onClick={() => setSelectedId(null)}>Fermer</button>
        </div>
      )}
    </div>
  );
}

export default App;
