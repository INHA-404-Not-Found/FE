import api from "./api.js";

// 게시물 등록
export const registerPost = async (
  toggleChecked,
  studentId,
  categories,
  location,
  locationDetail,
  storageLocation,
  title,
  content,
  type
) => {
  console.log(
    toggleChecked,
    studentId,
    categories,
    location,
    locationDetail,
    storageLocation,
    title,
    content,
    type
  );

  var postData;
  if (type == "FIND") {
    postData = {
      locationId: location,
      title: title,
      content: content,
      storedLocation: storageLocation,
      status: "UNCOMPLETED",
      type: type,
      isPersonal: toggleChecked,
      categories: categories,
    };

    if (studentId !== "") {
      postData.studentId = studentId;
    }
    if (locationDetail !== "") {
      postData.locationDetail = locationDetail;
    }
  } else if (type == "LOST") {
    postData = {
      locationId: location,
      title: title,
      content: content,
      status: "UNCOMPLETED",
      type: type,
      categories: categories,
    };

    if (locationDetail !== "") {
      postData.locationDetail = locationDetail;
    }
  }

  try {
    const res = await api.post("/posts", postData);
    console.log(
      "registerPost: ",
      res.data.message,
      "[게시글 ID: ",
      res.data.postId,
      "]"
    );
  } catch (err) {
    console.error("에러 발생: ", err);
    alert("registerPost 실패");
  }
};
// 이미지 등록
export const registerPostImage = async (post_id, files) => {
  try {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    console.log("FormData: ");
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const res = await api.post(`/posts/${post_id}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("registerPostImage 성공:", res.data);
  } catch (err) {
    console.error("registerPostImage 에러:", err);
    alert("registerPostImage 실패");
  }
};
// 게시글 수정
export const modifyPost = async (post_id, postDetail, images) => {
  console.log("modifyPost start");
  console.log(postDetail);

  delete postDetail.imagePath;

  try {
    const res = await api.patch("/posts/" + post_id, postDetail);

    console.log("modifyPost: ", res.data);
    alert("『" + postDetail.title + " 』을 수정하였습니다.");

    // 이미지 등록
    if (images.length > 0 && images) {
      console.log("이미지 등록: ", post_id, images);
      await modifyPostImage(post_id, images);
    }
  } catch (err) {
    console.error("에러 발생: ", err);
    alert("modifyPost 실패");
  }
};

// 게시글->이미지 수정
export const modifyPostImage = async (post_id, files) => {
  console.log("modifyPostImage start");
  console.log(post_id, files);

  try {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    console.log("FormData: ");
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const res = await api.patch(`/posts/${post_id}/images`, formData);

    console.log("registerPostImage 성공:", res.data);
  } catch (err) {
    console.error("registerPostImage 에러:", err);
    alert("registerPostImage 실패");
  }
};

// 게시물 인계 여부 일괄 수정
export const modifyPosts = async (postIds, status) => {
  console.log("modifyPosts start");
  console.log(postIds, status);

  try {
    const res = await api.patch("/posts/update", {
      postIds: postIds,
      status,
    });
    console.log("modifyPosts: ", res.data);
  } catch (err) {
    console.error("에러 발생: ", err);
    alert("modifyPosts 실패");
  }
};

// 게시물 단일 삭제
export const removePost = async (post_id) => {
  try {
    const res = await api.delete("/posts/" + post_id);
    console.log("removePost: ", res.data);
  } catch (err) {
    console.error("에러 발생: ", err);
    alert("removePost 실패");
  }
};

// 게시물 일괄 삭제
export const removePosts = async (postIds) => {
  try {
    const res = await api.post("/posts/delete", {
      postIds,
    });
    console.log("removePosts: ", res.data);
  } catch (err) {
    console.error("에러 발생: ", err);
    alert("removePosts 실패");
  }
};

// 한 게시물 가져오기
export const getPost = async (setPostDetail, post_id) => {
  console.log("getPost start");

  try {
    const res = await api.get("/posts/" + post_id);

    setPostDetail(res.data);
    console.log("getPost: ", res.data);
  } catch (err) {
    console.error("에러 발생: ", err);
    alert("getPost 실패");
  }
};
const PAGE_SIZE = 10;
// 모든 게시물 리스트 가져오기
export const getAllPosts = async (
  setPostList,
  page = 1,
  hasNext,
  setHasNext
) => {
  try {
    const res = await api.get("/posts", {
      params: { page: page },
    });
    console.log(res.data);
    console.log("getAllPosts: ", "성공");
    setPostList((prev) => (page === 1 ? res.data : [...prev, ...res.data]));
    setHasNext(res.data.length === PAGE_SIZE);
  } catch (err) {
    console.error("에러 발생: ", err);
    alert("getAllPosts 실패");
  }
};

// 게시물 목록 필터링 조회
export const getPostsByTags = async (
  setPostList,
  page,
  status,
  type,
  location,
  category,
  hasNext,
  setHasNext
) => {
  console.log("getPostsByTags start");
  var FilterData = { page: page };
  console.log("필터링 페이지: ", page);
  if (status != "") {
    FilterData.status = status;
    console.log("필터링 상태: ", status);
  }
  if (type != "ALL") {
    FilterData.type = type;
    console.log("필터링 타입: ", type);
  } else {
    FilterData.type = "";
  }
  if (location != []) {
    FilterData.location_id = location.id;
    console.log("필터링 위치ID: ", location.id);
  }
  if (category != []) {
    FilterData.category_id = category.id;
    console.log("필터링 카테고리ID: ", category.id);
  }

  try {
    const res = await api.get("/posts/tags", {
      // params: {
      //     page,
      //     status,
      //     type,
      //     location_id: locationId,
      //     category_id: categoryId
      // }
      params: FilterData,
    });

    setPostList((prev) => (page === 1 ? res.data : [...prev, ...res.data]));
    setHasNext(res.data.length === PAGE_SIZE);
    console.log(res.data);
    console.log("getPostsByTags: ", "성공");
  } catch (err) {
    console.error("에러 발생: ", err);
    alert("getPostsByTags 실패");
    return null;
  }
};

// 게시물 키워드로 검색
export const getPostsByKeyword = async (
  setPostList,
  keyword,
  page = 1,
  setHasNext
) => {
  console.log("getPostsByKeyword start: " + keyword);

  if (!keyword) {
    alert("검색어를 입력해주세요.");
  }

  try {
    const res = await api.get("/posts/search", {
      params: {
        keyword: keyword,
        page: page,
      },
    });

    console.log("getPostsByKeyword: " + res.data);
    console.log(res.data);
    setHasNext(res.data.length === PAGE_SIZE);
    setPostList((prev) => (page === 1 ? res.data : [...prev, ...res.data]));
  } catch (err) {
    console.error("에러 발생: ", err);
    alert("getPostsByKeyword 실패");
    return null;
  }
};

// 게시물 키워드 + 필터링 조회
export const getPostsByKeywordFilter = async (
  setPostList,
  keyword,
  page = 1,
  status,
  type,
  location,
  category,
  setHasNext
) => {
  console.log("getPostsByKeywordFilter start: " + keyword);

  if (!keyword) {
    alert("검색어를 입력해주세요.");
  }
  var FilterData = {
    keyword: keyword,
    page: page,
  };
  console.log("필터링 페이지: ", page);
  if (status != "") {
    FilterData.status = status;
    console.log("필터링 상태: ", status);
  }
  if (type != "ALL") {
    FilterData.type = type;
    console.log("필터링 타입: ", type);
  } else {
    FilterData.type = "";
  }
  if (location != []) {
    FilterData.location_id = location.id;
    console.log("필터링 위치ID: ", location.id);
  }
  if (category != []) {
    FilterData.category_id = category.id;
    console.log("필터링 카테고리ID: ", category.id);
  }

  try {
    const res = await api.get("/posts/search/tags", {
      params: FilterData,
    });

    console.log("getPostsByKeywordFilter: " + res.data);
    setHasNext(res.data.length === PAGE_SIZE);
    setPostList((prev) => (page === 1 ? res.data : [...prev, ...res.data]));
  } catch (err) {
    console.error("에러 발생: ", err);
    alert("getPostsByKeywordFilter 실패");
    return null;
  }
};

// 내 게시물 목록 조회
export const getMyPosts = async (setPostList, page = 1) => {
  try {
    const res = await api.get("/posts/my", {
      params: { page: page },
    });
    console.log(res.data);
    console.log("getMyPosts: ", page, "성공");
    setPostList((prev) => (page === 1 ? res.data : [...prev, ...res.data]));
  } catch (err) {
    console.error("에러 발생: ", err);
    alert("getMyPosts 실패");
  }
};
