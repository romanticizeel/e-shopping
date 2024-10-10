import instance from "@/lib/axios/instance";

const authServices = {
  registerAccount: (data: any) => instance.post("/user/register", data),
};

export default authServices;
