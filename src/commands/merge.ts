import * as fs from "fs";
import { flatten } from "lodash";
import { Command, flags } from "@oclif/command";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import * as path from "path";

export default class Merge extends Command {
  static description =
    "merge all types from the Schemas directory and combine them into a single RootType.ts";

  static flags = {
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: "n", description: "Service Name" }),
    schemaPaths: flags.string({
      char: "s",
      description: "Paths to GraphQL Schemas, separated by a comma"
    }),
    output: flags.string({
      char: "o",
      description: "Output directory for generated contents"
    })
  };

  static examples = [`$ types merge-schemas`];

  async run() {
    const { flags } = this.parse(Merge);

    const schemas =
      (flags && flags.schemaPaths && flags.schemaPaths.split(",")) || [];

    const typesArray = flatten(
      schemas.map(schemaPath => {
        return fileLoader(path.resolve(schemaPath + "/**/*.graphql"), {
          globOptions: {
            ignore: '/**/Root.graphql'
          }
        });
      })
    );

    const mergedRootTypes = mergeTypes(typesArray);

    const outputPath = flags && flags.output;

    if (!outputPath) {
      throw new Error("Must specify output directory");
    }

    fs.writeFileSync(path.resolve(outputPath, "Root.graphql"), mergedRootTypes);
  }
}
