import { useQuery } from "@tanstack/react-query";
import { postKeys } from "../keys/postKeys";
import { getPosts } from "../services/postService";

export const usePosts = () => {
  return useQuery({
    queryKey: postKeys.lists(),
    queryFn: getPosts,
  });
};