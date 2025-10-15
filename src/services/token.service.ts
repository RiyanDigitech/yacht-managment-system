import Cookies from "js-cookie";
import {
  cookieAuth,
  cookieData,
  cookieRefresh,
  tokenRetries,
} from "@/lib/cookies";
import { UserType } from "@/lib/types/user";
import { jwtDecode } from "jwt-decode";
import { userDataType } from "@/lib/types/auth";
class TokenService {
   getLocalAccessToken = () => Cookies.get(cookieAuth);

  saveLocalAccessToken = (token: string) => {
    Cookies.set(cookieAuth, token, { sameSite: "strict", expires: 1 }); // 1 day expiry
  };
  getLocalRefreshToken = () => {
    return Cookies.get(cookieRefresh);
  };
  saveLocalRefreshToken = (token: string) => {
    Cookies.set(cookieRefresh, token);
  };
  getUser = () => {
    const data = localStorage.getItem(cookieData);
    return data ? JSON.parse(data) : null;
  };
  setUser = (user: any) => {
    localStorage.setItem(cookieData, JSON.stringify(user));
  };
  updateUser = <T extends keyof UserType>(key: T, value: UserType[T]) => {
    const userObject = this.getUser();
    if (userObject) {
      userObject[key] = value;
      this.setUser(userObject);
    } else {
      throw new Error("Error");
    }
  };
  getUserRoleFromCookie = () => {
    const token = Cookies.get(cookieAuth);
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded?.role || null;
    } catch (err) {
      console.error("Invalid token:", err);
      return null;
    }
  };

  setLastUserData = (userObject: userDataType) => {
    localStorage.setItem("lastPersonData", JSON.stringify(userObject));
  };

  getLastUserData = () => {
    const stored = localStorage.getItem("lastPersonData");
    return stored ? JSON.parse(stored) : null;
  };

  setTokenRetries = (retries: number) => {
    localStorage.setItem(tokenRetries, retries.toString());
  };

  getTokenRetries = () => {
    const val = localStorage.getItem(tokenRetries);
    return val ? parseInt(val) : 0;
  };

  clearStorage = () => {
    localStorage.removeItem(cookieData);
    localStorage.removeItem("lastPersonData");
    localStorage.removeItem(tokenRetries);
    Cookies.remove(cookieAuth);
    Cookies.remove(cookieRefresh);
  };
}
export default new TokenService();
