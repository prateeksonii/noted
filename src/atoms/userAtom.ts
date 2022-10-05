import { User } from "@prisma/client";
import { atom } from "jotai";

export default atom<User | null>(null);
