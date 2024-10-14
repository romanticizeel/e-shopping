import instance from "@/lib/axios/instance";

const userServices = {
  getAllUsers: () => instance.get("/user"),
  updateUser: (id: string, data: any) => instance.put(`/user`, { id, data }),
  deleteUser: (id: string) => instance.delete(`/user/${id}`),
};

export default userServices;
