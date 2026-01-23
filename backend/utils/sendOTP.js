import axios from "axios";

const sendOTP = async (mobile, otp) => {
  try {
    const payload = {
      mobile: `91${mobile}`,
      otp,
      template_id: process.env.MSG91_TEMPLATE_ID
    };

    await axios.post(
      "https://api.msg91.com/api/v5/otp",
      payload,
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY
        }
      }
    );
  } catch (error) {
    console.error(
      "MSG91 OTP error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default sendOTP;


