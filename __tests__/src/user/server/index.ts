import { QueryResolvers } from "../types";

interface Context {
  fruit: "PEAR" | "PEACH";
}

export const Query: QueryResolvers.Resolvers<Context> = {
  user(_parent, _params, { fruit }) {
    return {
      id: "23ir2"
    };
  }
};
