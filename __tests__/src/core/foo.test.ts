import { createCoreBinding } from "./binding";

const coreBinding = createCoreBinding({
  uri: "http://localhost:3000",
  serviceId: "test"
});

coreBinding.query.hello()
coreBinding.mutation.createFoo()