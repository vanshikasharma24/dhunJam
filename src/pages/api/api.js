// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios"
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
export const loginAPI = async (username, password) => {
  try {
    const response= await axios.post(`https://stg.dhunjam.in/account/admin/login`, {
      username: username,
      password: password,
    });
    // return response;
    if (response) {
      return response?.data;
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    alert(error?.message);
  }
};
export const getAdminDetails = async (accessToken,id) => {
  console.log(id,"id")
  try {
    const response=await axios.get(`https://stg.dhunjam.in/account/admin/${id}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    if (response?.status) {
      return response?.data?.data;
    }
  } catch (error) {
    alert(error?.message);
  }
};

export const updatePrice = async (id, amountData) => {
  try {
    const response = await axios.put(`https://stg.dhunjam.in/account/admin/${id}`, {
      amount: amountData,
    });
    if (response) {
      console.log(response,"tresponse")
      return response.data;
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    alert(error?.message);
  }
};