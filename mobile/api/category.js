import api from "./api.js";

// 전체 카테고리 조회
export const getAllCategories = async (setCategoryList) => {
  console.log("getAllCategories start");

  try {
    const res = await api.get("/categories");

    console.log("getAllCategories: ", res.data);

    setCategoryList(res.data);
  } catch (err) {
    console.error("에러 발생: ", err);
    alert("getAllCategories 실패");
  }
};

// 단일 카테고리 조회
export const getCategory = async (id) => {
  try {
    await api.get("/categories/" + id);

    console.log("getCategory: ", "성공");
  } catch (err) {
    console.error("에러 발생: ", err);
    alert("getCategory 실패");
  }
};
