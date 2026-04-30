import { useQuery } from "@tanstack/react-query";
import { postKeys } from "../keys/postKeys";
import { getPost } from "../services/postService";

export const usePost = (id: number) => {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => getPost(id),
  });
};