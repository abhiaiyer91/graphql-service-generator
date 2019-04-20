import * as path from "path";
import { writeFileSync } from "fs";
import { getSchemaFromInput } from "../utils";
import { TSGenerator } from "./generator";

export function createBinding(serviceName: string, schema: string) {
  const builtSchema = getSchemaFromInput(schema);

  const outputBinding = path.resolve(`./src/${serviceName}/binding.ts`);

  const generatorInstance = new TSGenerator({
    schema: builtSchema,
    serviceName,
    inputSchemaPath: ``,
    isDefaultExport: false,
    outputBindingPath: outputBinding
  });

  const code = generatorInstance.render();

  return writeFileSync(outputBinding, code);
}
