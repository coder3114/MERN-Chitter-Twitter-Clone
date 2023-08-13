import axios from "axios";

export const submitPeep = async (peep) => {
  try {
    console.log(peep);
    console.log(`${import.meta.env.VITE_PEEPSURL}/post`);
    const res = await axios.post(`${import.meta.env.VITE_PEEPSURL}/post`, peep);
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
