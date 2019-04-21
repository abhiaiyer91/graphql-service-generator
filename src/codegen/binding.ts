import * as path from "path";
import { writeFileSync } from "fs";
import { getSchemaFromInput } from "../utils";
import { TSGenerator } from "./generator";

interface CreateBinding {
  outputPath: string;
  serviceName: string;
  schema: string;
}

export function createBinding({
  outputPath,
  serviceName,
  schema
}: CreateBinding) {
  const builtSchema = getSchemaFromInput(schema);

  const outputBinding = path.resolve(outputPath, "binding.ts");

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
