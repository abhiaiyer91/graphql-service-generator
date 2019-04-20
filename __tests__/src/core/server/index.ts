import { QueryResolvers } from "../types";

interface Context {
  fruit: "PEAR" | "PEACH";
}

export const Query: QueryResolvers.Resolvers<Context> = {
  hello(_parent, _params, { fruit }) {
    return "Hello" + fruit;
  }
};
