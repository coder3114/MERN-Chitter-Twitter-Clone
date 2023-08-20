import axios from "axios";

export const submitPeep = async (peep) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_PEEPSURL}/peeps`,
      peep
    );
    return { peep: res.data, status: res.status };
  } catch (e) {
    return {
      status: e.response?.status,
      error: {
        type: `post`,
        message: e.response?.message,
      },
    };
  }
};

export const getPeeps = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_PEEPSURL}/peeps`);
    if (Array.isArray(res.data) && res.data?.length > 0)
      return { peeps: res.data, status: res.status };
    throw new Error(`There are no peeps to retrieve, please post one`);
  } catch (e) {
    return {
      peeps: [],
      status: e.response?.status ?? 204,
      error: {
        type: `get`,
        message: `Data not available from the server: ${
          e.message ?? e.response.message
        }`,
      },
    };
  }
};
