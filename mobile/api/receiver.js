import api from "./api.js";


// 수령인 등록
/*export const registerReceiver = async () => {
    try {
        const res = await api.post('/admin/receivers', {
            postId,
            name,
            email,
            phoneNumber,
            studentId
        });
        console.log("registerReceiver: ", res.data.message, "[receiverId: ", res.data.receiverId, "]");
    
    } catch (err) {
        console.error('에러 발생: ', err);
        alert("registerReceiver 실패");
    }
};
*/

// 수령인 수정
/*
export const updateReceiver = async (receiver_id) => {
    try {
        const res = await api.patch('/admin/receivers/' + receiver_id, {
            name,
            email,
            phoneNumber,
            studentId
        });
        console.log("updateReceiver: ", res.data);
        
    } catch (err) {
        console.error('에러 발생: ', err);
        alert("updateReceiver 실패");
    }
};
*/

// 수령인 삭제
export const deleteReceiver = async (receiver_id) => {
    try {
        const res = await api.delete('/admin/receivers/' + receiver_id);
        console.log("deleteReceiver: ", res.data);
        
    } catch (err) {
        console.error('에러 발생: ', err);
        alert("deleteReceiver 실패");
    }
};


// 특정 수령인 조회
export const getReceiver = async (receiver_id) => {
    try {
        const res = await api.get('/admin/receivers/' + receiver_id);
        console.log("getReceiver: ", res.data);
        
    } catch (err) {
        console.error('에러 발생: ', err);
        alert("getReceiver 실패");
    }
};


// 특정 게시물의 수령인 조회
export const getReceiverByPost = async (setReceiver, postId) => {
    console.log("getReceiverByPost start");

    try {
        const res = await api.get('/admin/receivers/posts/' + postId);
        
        setReceiver(res.data);
        console.log("getReceiverByPost: ", res.data);
        
    } catch (err) {
        console.error('에러 발생: ', err);
        alert("getReceiverByPost 실패");
    }
};


// 모든 수령인 목록 조회
export const getAllReceivers = async (post_id) => {
    try {
        const res = await api.get('/admin/receivers/');
        console.log("getAllReceivers: ", res.data);
        
    } catch (err) {
        console.error('에러 발생: ', err);
        alert("getAllReceivers 실패");
    }
};