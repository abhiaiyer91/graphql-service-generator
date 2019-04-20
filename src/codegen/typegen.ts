import { generate } from "graphql-code-generator";
import * as path from "path";
import * as fs from "fs";
import { printSchemaFromInput } from "../utils";

export function typegen(serviceName: string, schema: string) {
  const builtSchema = printSchemaFromInput(schema);
  const outputBinding = path.resolve(
    `./src/${serviceName}/generatedSchema.graphql`
  );

  fs.writeFileSync(outputBinding, builtSchema, `utf-8`);

  const config = {
    overwrite: true,
    schema: [`./src/${serviceName}/generatedSchema.graphql`],
    generates: {
      [`src/${serviceName}/types.ts`]: {
        plugins: [
          { add: `// THIS IS A GENERATED FILE` },
          `typescript-common`,
          `typescript-server`,
          `typescript-resolvers`
        ]
      }
    }
  };

  const output = generate(config);

  function cleanup() {
    fs.unlinkSync(outputBinding);
  }

  return output.then(cleanup).catch(e => {
    console.error(e.message);
    console.log(serviceName);
    cleanup();
  });
}
