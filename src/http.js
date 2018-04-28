import axios from "axios";

const API_TOKEN = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;

if (!API_TOKEN) {
  console.warn(
    "You have not provided an access token. Please visit https://github.com/settings/tokens to generate one."
  );
}

export const client = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${API_TOKEN}`,
  },
});
