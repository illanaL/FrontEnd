import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

export const getPost = async (id: number) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

export const createPost = async (data: { title: string; body: string }) => {
  const res = await api.post("/posts", data);
  return res.data;
};

export const deletePost = async (id: number) => {
  await api.delete(`/posts/${id}`);
  return id;
};