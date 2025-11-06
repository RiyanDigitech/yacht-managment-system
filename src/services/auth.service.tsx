import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/config/axios-instance";
import { useNavigate } from "react-router-dom";
import tokenService from "./token.service";
import { notification } from "antd";
import { ChangePasswordType, errorType, userType } from "@/lib/types";
import {
  ForgotEmailResponse,
  ForgotEmailType,
  LoginApiResponse,
} from "@/lib/types/auth";
import { UserInfo } from "@/lib/types/user";
import { buildUrlWithParams } from "@/lib/helpers";

// import;
const AuthService = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const useHandleLoginInService = (reset: () => void) => {
  function handleLogInRequest(data: userType): Promise<LoginApiResponse> {
    return axios.post(`/public/login`, data);
  }

  const onSuccess = (response: LoginApiResponse) => {
  const { access_token, user } = response?.data?.data || {};

  if (!access_token || !user) return;

  const role = user?.roles?.[0]?.name || "Unknown";

  const userObject = {
    id: user.id,
    username: user.name,
    email: user.email,
    role,
  };

  // ✅ Save in cookies + localStorage
  tokenService.saveLocalAccessToken(access_token);
  tokenService.setUser(userObject);
  tokenService.setLastUserData(userObject);
  tokenService.setTokenRetries(5);

  notification.success({
    message: "Login Successful",
    description: response?.data?.message || "You have successfully logged in!",
    placement: "topRight",
  });

  // ✅ Role-based redirect
  if (role === "Owner") {
    navigate("/dashboard");
  } 
  else if (role === "Customer"){
    navigate("/");
  }
  else {
    navigate("/dashboard");
  }

  queryClient.invalidateQueries({ queryKey: ["user"] });
  reset();
};


  const onError = (error: errorType) => {
    console.log(error, "error");
    notification.error({
      message: "Login Failed",
      description: error?.response?.data?.message || "Invalid credentials",
      placement: "topRight",
    });
  };

  return useMutation({
    mutationFn: handleLogInRequest,
    onSuccess,
    onError,
    retry: 0,
  });
};

// const useHandleLoginInService = (reset: () => void) => {
//   function handleLogInRequest(data: userType): Promise<LoginApiResponse> {
//     return axios.post(`/login`, data);
//   }

//   const onSuccess = (response: LoginApiResponse) => {
//     const user = response?.data?.data?.user;
//     const accessToken = response?.data?.data?.access_token;

//     const userObject = {
//       id: user?.id,
//       username: user?.name,
//       email: user?.email,
//       role: user?.role,
//     };

//     if (user?.role === "Owner" || user?.role === "Salesman") {
//       tokenService.setLastUserData(userObject);
//       tokenService.setUser(user?.name);
//       tokenService.setTokenRetries(5);
//       tokenService.saveLocalAccessToken(accessToken);
//     }

//     notification.success({
//       message: "Login Successful",
//       description: response?.data?.message || "You have successfully logged in!",
//       placement: "topRight",
//     });

//     navigate("/"); // redirect to home
//     queryClient.invalidateQueries({ queryKey: ["user"] });
//     reset();
//   };

//   const onError = (error: errorType) => {
//     console.log(error, "error");
//     notification.error({
//       message: "Login Failed",
//       description: error?.response?.data?.message || "Invalid credentials",
//       placement: "topRight",
//     });
//   };

//   return useMutation({
//     mutationFn: handleLogInRequest,
//     onSuccess,
//     onError,
//     retry: 0,
//   });
// };  

  const useHandleForGotPassword = (reset: () => void) => {
    function handleForgotRequest(
      data: ForgotEmailType
    ): Promise<ForgotEmailResponse> {
      return axios.post(`/forgot-password`, data);
    }
    const onSuccess = (response: ForgotEmailResponse) => {
      console.log(response);

      notification.success({
        message: "request Successful",
        description: "Link has been sent on your email account",
        placement: "topRight",
      });
      // navigate("/otpforgetpassword");

      queryClient.invalidateQueries({ queryKey: ["user"] });
      reset();
    };
    const onError = (error: errorType) => {
      console.log(error);
      notification.error({
        message: "Failed",
        description:
          error?.response?.data?.message || "Failed to Forget-password",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleForgotRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useHandleChangePassword = (reset: () => void) => {
    function handleChangeRequest(
      data: ChangePasswordType
    ): Promise<ForgotEmailResponse> {
      return axios.post(`/change-password`, data);
    }
    const onSuccess = (response: ForgotEmailResponse) => {
      console.log(response);

      notification.success({
        message: "request Successful",
        description: "password changed successfully",
        placement: "topRight",
      });
      tokenService.clearStorage();

      navigate("/login");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      reset();
    };
    const onError = (error: errorType) => {
      console.log(error);
      notification.error({
        message: "Failed",
        description:
          error?.response?.data?.message || "Failed to update the password",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleChangeRequest,
      onError,
      onSuccess,
      retry: 0,
    });
  };
 const useHandleResetPassword = (
  reset: () => void,
  safeToken: string,
  safeEmail: string
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleResetRequest = (data: ChangePasswordType) => {
    const payload = {
      email: safeEmail, // ✅ use the URL email directly
      token: safeToken,
      password: data.newPassword,
      password_confirmation: data.confirmPassword,
    };

    console.log("Reset password payload:", payload); // ✅ verify email before API
    return axios.post("/reset-password", payload);
  };

  const onSuccess = () => {
    notification.success({
      message: "Success",
      description: "Password has been reset successfully!",
      placement: "topRight",
    });
    reset();
    navigate("/admin/login");
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  const onError = (error: errorType) => {
    notification.error({
      message: "Failed",
      description:
        error?.response?.data?.message || "Failed to reset password",
      placement: "topRight",
    });
  };

  return useMutation({
    mutationFn: handleResetRequest,
    onSuccess,
    onError,
    retry: 0,
  });
};

  const useHandleUpdateProfile = () => {
    function handleLogInRequest(data: UserInfo): Promise<LoginApiResponse> {
      return axios.put(`/admin/update`, data);
    }
    const onSuccess = (response: LoginApiResponse) => {
      console.log("console checking....", response);
      // const userObject = {
      //   name: response?.data?.data?.username,
      //   email: response?.data?.data?.email,
      //   phone: response?.data?.data?.phone,
      //   address: response?.data?.data?.address || "",
      // };
      // tokenService?.setLastUserData(userObject);

      notification.success({
        message: "updated profile Successful",
        description: "You have successfully updated the profile!",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    };

    const onError = (error: errorType) => {
      console.log(error, "error");
      notification.error({
        message: "Login Failed",
        description: error?.response?.data?.message || "Login Failed",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleLogInRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useFetchTargetedAdmin = () => {
    async function fetchTeam(): Promise<ApiResponseAccountDetails> {
      const url = buildUrlWithParams(`/`, {});
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchTeam,
      queryKey: ["user"],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };

  //logout
  const useHandleLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleLogoutRequest() {
    return axios.post(`/logout`);
  }

  const onSuccess = () => {
    // ✅ Clear tokens + user data
    tokenService.clearStorage();
    queryClient.clear();

    notification.success({
      message: "Logout Successful",
      description: "You have been logged out successfully.",
      placement: "topRight",
    });

    navigate("/");
  };

  const onError = (error: errorType) => {
    notification.error({
      message: "Logout Failed",
      description:
        error?.response?.data?.message || "Failed to logout. Please try again.",
      placement: "topRight",
    });
  };

  return useMutation({
    mutationFn: handleLogoutRequest,
    onSuccess,
    onError,
    retry: 0,
  });
};

  return {
    useHandleLoginInService,
    useHandleForGotPassword,
    useHandleChangePassword,
    useHandleUpdateProfile,
    useHandleResetPassword,
    useFetchTargetedAdmin,
    useHandleLogout
  };
};

export default AuthService;
