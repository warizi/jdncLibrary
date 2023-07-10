import {ListManager} from "../module/ListManager.js";
import {myBookListGet} from "../API/myBookListAPI.js";
import {myBookListTemplate} from "../module/template.js";


function main () {
    const listContainer = document.querySelector('.list_container');
    const myBookList = new ListManager(myBookListTemplate);
    const listCount = 1;
    initializeRender();
    function initializeRender () {
        myBookListGet('/api/book/borrow/my')
            .then((data) => {
                if(data) {
                    console.log(data);
                    myBookList.initList(data, 'normal', listContainer);
                    myBookList.render();
                } else {
                    alert('서버 요청 실패, 다시 시도해주세요.');
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
};
main();
