import { UserInterface } from "./user.interface";

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserInterface;
    }
  }
}
