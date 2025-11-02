import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyInfo, loginApi, logoutApi } from "../api/auth";
import { clearMy, setMy } from "../Redux/slices/mySlice";
import { tokenStorage } from "../tokenStorage";
import { TokenStore } from "../TokenStore";

export function useAuth() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const my = useSelector((state) => state.my.info);

  const login = async (studentId, password) => {
    try {
      const res = await loginApi(studentId, password);
      TokenStore.setToken(res.data.accessToken);
      await tokenStorage.saveTStorage({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      console.log("로그인 api 호출성공: ", TokenStore.getToken());

      try {
        const meRes = await fetchMyInfo();
        dispatch(setMy(meRes.data));
        console.log("프로필 로딩 성공: ", meRes.data);
      } catch (e) {
        console.warn(
          "프로필 로딩 실패(무시 가능):",
          e?.response?.status,
          e?.message
        );
      }

      // 로그인 후 뒤로가기 방지
      navigation.reset({
        index: 0,
        routes: [{ name: "MainScreen" }],
      });
      return true; // 성공 신호
    } catch (error) {
      console.error("로그인 실패:", error?.response?.status, error?.message);
      TokenStore.clearToken();
      await tokenStorage.clearTStorage();
      dispatch(clearMy());
      return false; // 실패 신호
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (e) {
      console.warn("서버 로그아웃 실패 (무시 가능)", e.message);
    } finally {
      TokenStore.clearToken();
      await tokenStorage.clearTStorage();
      dispatch(clearMy());
      // 메인으로 스택 초기화
      navigation.reset({
        index: 0,
        routes: [{ name: "MainScreen" }],
      });
    }
  };

  return { my, login, logout };
}
