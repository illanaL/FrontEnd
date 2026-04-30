import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../services/postService";
import { postKeys } from "../keys/postKeys";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData(postKeys.lists(), (old: any[] = []) => [
        {
          ...newPost,
          id: Date.now(),
        },
        ...old,
      ]);
    },
  });
};
