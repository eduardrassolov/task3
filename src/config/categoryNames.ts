export type Category = {
  idea: string;
  task: string;
  random: string;
  quote: string;
};

export const categories: Readonly<Category> = {
  idea: "idea",
  task: "task",
  random: "random",
  quote: "quote",
};
