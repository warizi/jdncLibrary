
export async function friendListGet (url) {
    const res = await fetch(url, { method: "GET" });
    const data = await res.json();
    if(res.status !== 200) {
        throw new Error('서버요청 실패');
    }
    return data;
}

export async function friendListPost (url, reqData) {
    const res = await fetch(url, { method: "POST", headers:{ 'Content-Type': 'application/json' }, body: JSON.stringify(reqData)})
    if(res.status !== 200) {
        throw new Error('서버요청 실패');
    }
    return res
}
export async function friendListPut (url) {
    const res = await fetch(url, { method: 'PUT'})
    console.log(res);
    if(res.status !== 200) {
        throw new Error('서버요청 실패');
    }
    return res
}
export async function friendListPage(url, pageSize, pageNumber) {
    const res = await fetch(`${url}?pageSize=${pageSize}&pageNumber=${pageNumber}`)
    const data = await res.json();
    if(res.status !== 200) {
        throw new Error('서버요청 실패');
    }
    return data;
}
