import { TokenStore } from "../TokenStore.js";
import api from "./api.js";


// 위치 조회
export const getAllLocations = async (setLocationList) => {
    try {
        const res = await api.get('/locations');

        setLocationList(res.data);
        console.log("getAllLocations: ", res.data);
        
    } catch (err) {
        console.error('에러 발생: ', err);
        alert("getAllLocations 실패");
    }
};