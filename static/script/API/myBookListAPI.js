export async function myBookListGet (url) {
    const res = await fetch(url, { method: "GET" });
    const data = await res.json();
    if(res.status !== 200) {
        throw new Error('오류');
    };
    return data;
}