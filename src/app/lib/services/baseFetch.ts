import { baseUrl } from "./constants";

type Config = {
  url: string;
  body?: any;
} & Omit<RequestInit, "body">;

export const bFetch = async (config: Config) => {
  const { url, body, ...init } = config;
  const response = await fetch(`${baseUrl}${url}`, { body: JSON.stringify(body), ...init });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
