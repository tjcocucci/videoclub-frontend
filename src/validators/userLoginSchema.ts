import { z } from "zod";

const userLoginSchema = z.object({
  username: z.string().min(1, "Username cannot be empty"),
  password: z.string().min(1, "Password cannot be empty"),
});

export default userLoginSchema;