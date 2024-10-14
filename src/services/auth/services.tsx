import { addData, retrieveDataByField } from "@/lib/firebase/service";
import bcrypt from "bcrypt";

export async function signUp(
  userData: {
    email: string;
    fullName: string;
    phone: string;
    password: string;
    role?: string;
    created_at: Date;
    updated_at: Date;
  },
  callback: (data: { status: boolean; message: string }) => void
) {
  const data = await retrieveDataByField("users", "email", userData.email);

  if (data.length > 0) {
    callback({ status: false, message: "User already exists" });
  } else {
    if (!userData.role) {
      userData.role = "member";
    }
    userData.password = bcrypt.hashSync(userData.password, 10);
    userData.created_at = new Date();
    userData.updated_at = new Date();
    addData("users", userData, (result: boolean) => {
      if (result) {
        callback({ status: true, message: "Register success" });
      } else {
        callback({ status: false, message: "Register failed" });
      }
    });
  }
}

export async function signIn(email: string) {
  const data = await retrieveDataByField("users", "email", email);

  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(
  data: {
    email: string;
    role?: string;
    password?: string;
    created_at?: Date;
    updated_at?: Date;
  },
  callback: (user: any) => void
) {
  const user = await retrieveDataByField("users", "email", data.email);

  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.role = "member";
    data.created_at = new Date();
    data.updated_at = new Date();
    data.password = "";
    await addData("users", data, (result: boolean) => {
      if (result) {
        callback(data);
      }
    });
  }
}
