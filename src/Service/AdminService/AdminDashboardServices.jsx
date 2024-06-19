import axios from "axios";

const AdminDashboardServices = {
  async fcnAddClientAsync(obj) {
    const response = await axios.post(
      "https://localhost:44377/api/Project/AddNewClient",
      obj
    );
    return response.data;
  },
};

export default AdminDashboardServices;
