import { generate } from "graphql-code-generator";
import * as path from "path";
import * as fs from "fs";
import { printSchemaFromInput } from "../utils";

interface TypeGen {
  outputPath: string;
  serviceName: string;
  schema: string;
}

export function typegen({ outputPath, serviceName, schema }: TypeGen) {
  const builtSchema = printSchemaFromInput(schema);
  const outputBinding = path.resolve(
    outputPath,
    'generatedSchema.graphql'
  );

  fs.writeFileSync(outputBinding, builtSchema, `utf-8`);

  const config = {
    overwrite: true,
    schema: outputBinding,
    generates: {
      [path.resolve(outputPath, "types.ts")]: {
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
