/* eslint-disable react-refresh/only-export-components */
import axios from "@/lib/config/axios-instance";



export const loginUserFunc = async (data:any) => {
  try {
    const response = await axios.post('/public/login', data)
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const logoutUser = async () => {
  try {
    const response = await axios.post('/logout');
    return response.data;
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};


export const SignUp = async (data:any) => {
  try {
    const response = await axios.post('/public/register', data)
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

