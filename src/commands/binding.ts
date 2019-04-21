import { Command, flags } from "@oclif/command";
import { createBinding, typegen } from "../codegen";
import { readFileSync } from "fs";

export default class Binding extends Command {
  static description = "Generate a GraphQL Binding";

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

  async run() {
    const { flags } = this.parse(Binding);
    const serviceName = flags && flags.name;

    if (!serviceName) {
      throw new Error("Name required");
    }
    const schemas =
      (flags && flags.schemaPaths && flags.schemaPaths.split(",")) || [];

    const schemasConents = schemas
      .map((schemapath: string) => {
        return readFileSync(schemapath, "utf-8");
      })
      .join(" ");

    const outputPath = flags && flags.output;

    if (!outputPath) {
      throw new Error("Must specify output directory");
    }

    createBinding({ serviceName, schema: schemasConents, outputPath });
    typegen({ serviceName, schema: schemasConents, outputPath });
  }
}
