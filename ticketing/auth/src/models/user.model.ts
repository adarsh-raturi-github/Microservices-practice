import mongoose from "mongoose";
import { PasswordManagementHelperService } from "../services";

//UserAttrs  → What data do I need to pass to CREATE a user?
interface UserAttrs {
  email: string;
  password: string;
}

//UserDocument    → What does a user document LOOK LIKE after it's in MongoDB?
interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

//UserModel  → What methods does the User model itself have?
interface UserModel extends mongoose.Model<UserDocument> {
  buildUser(attrs: UserAttrs): UserDocument;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_doc, ret: any) {
        ret.id = ret._id;
        delete ret.password;
        delete ret.__v;
        delete ret._id;
      },
    },
  },
);
// static method
UserSchema.statics.buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};
//middleware function runs before sabing data
UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashPassword = await PasswordManagementHelperService.toHash(
      this.get("password"),
    );
    this.set("password", hashPassword);
  }
  done;
});
const User = mongoose.model<UserDocument, UserModel>("User", UserSchema);
export { User };
