import { UserInterface } from "./";

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserInterface;
    }
  }
}
