import axios from "axios";

export const registerUser = async (user) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_PEEPSURL}/register`,
      user
    );
    return { user: res.data, status: res.status };
  } catch (e) {
    return {
      status: e.response?.status,
      error: {
        type: `post`,
        message: e.response?.data.message,
      },
    };
  }
};

export const loginUser = async (user) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_PEEPSURL}/login`,
      user
    );
    return {
      userId: res.data.userId,
      message: res.data.message,
      status: res.status,
    };
  } catch (e) {
    return {
      status: e.response?.status,
      error: {
        type: `post`,
        message: e.response?.data.message,
      },
    };
  }
};
