import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../services/postService";
import { postKeys } from "../keys/postKeys";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });

      const previousPosts = queryClient.getQueryData<any[]>(postKeys.lists());

      queryClient.setQueryData(postKeys.lists(), (old: any[] = []) =>
        old.filter((post) => post.id !== id)
      );

      return { previousPosts };
    },

    onError: (_err, _id, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(postKeys.lists(), context.previousPosts);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
};