import { TokenStore } from "../TokenStore.js";
import api from "./api.js";


// 카테고리 생성
export const createCategory = async (name) => {
    try {
        await api.post('/categories', {
            name
        });

        console.log("createCategory: ", '성공');
        alert("카테고리가 추가되었습니다.");
        
    } catch (err) {
        console.error('에러 발생: ', err);
        alert("createCategory 실패");
    }
};


// 전체 카테고리 조회
export const getAllCategories = async (setCategoryList) => {
    console.log("getAllCategories start");
    
    try {
        const res = await api.get('/categories');

        console.log("getAllCategories: ", res.data);
        
        setCategoryList(res.data);
    } catch (err) {
        console.error('에러 발생: ', err);
        alert("getAllCategories 실패");
    }
};


// 단일 카테고리 조회
export const getCategory = async (id) => {
    try {
        await api.get('/categories/' + id);

        console.log("getCategory: ", '성공');
        
    } catch (err) {
        console.error('에러 발생: ', err);
        alert("getCategory 실패");
    }
};


// 카테고리 수정
export const updateCategory = async (id, categoryName) => {
    try {
        const res = await api.patch('/categories/' + id, {
            name: categoryName
        });

        console.log("updateCategory: ", res.data);
        alert("수정되었습니다.");
    } catch (err) {
        console.error('에러 발생: ', err);
        alert("updateCategory 실패");
    }
};


// 카테고리 삭제
export const deleteCategory = async (id) => {
    try {
        await api.delete('/categories/' + id);

        console.log("deleteCategory: ", '성공');
        alert("삭제되었습니다.");
        
    } catch (err) {
        console.error('에러 발생: ', err);
        alert("deleteCategory 실패");
    }
};