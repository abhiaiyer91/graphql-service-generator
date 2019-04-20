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

    createBinding(serviceName, schemasConents);
    typegen(serviceName, schemasConents);
  }
}
