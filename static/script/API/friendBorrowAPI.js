export async function fetchFriendBorrowGet (url) {
    const res = await fetch(url, { method: 'GET' })
    const data = await res.json();
    if(res.status === 400) {
        throw new Error('잘못된 요청');
    }
    if(res.status !== 200) {
        throw new Error('서버 오류');
    }
    return data
}

export async function fetchFriendBorrowPost (url, reqData) {
    const res = await fetch(url, { method: "POST", headers:{ 'Content-Type': 'application/json' }, body: JSON.stringify(reqData)})
    if(res.status !== 200) {
        throw new Error('서버오류');
    }
    return res
}

export async function fetchFriendBorrowPut (url) {
    const res = await fetch(url, { method: 'PUT' })
    if(res.status === 400) {
        throw new Error('잘못된 요청');
    }
    if(res.status !== 200) {
        throw new Error('서버오류');
    }
    return res
}