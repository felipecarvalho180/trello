import { client } from "../config";

export const getTodoGroupedByColumn = async () => {
  const data = await client.get("todos");

  return data;
};
