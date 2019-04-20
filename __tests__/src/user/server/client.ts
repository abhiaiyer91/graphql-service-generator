import { createUserBinding } from "../binding";

const userBinding = createUserBinding({
  uri: "http://localhost:3000",
  serviceId: "test"
});

userBinding.query.user();
userBinding.mutation.createUser();
