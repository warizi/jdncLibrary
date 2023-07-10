import { listRender } from "../module/render.js";
import { checkBookListTemplate } from "../module/template.js";

function listRendering () {
    const listElem = document.querySelector('.return_list');
    //url 수정 필요
    fetch('/api/book/borrow', {
        method: "GET"
    })
    .then((res) => {
        if(res.status === 200) {
            return res.json();
        } else {
            throw Error("200코드가 아닙니다")
        }
    })
    .then((data) => {
        console.log(data);
        listRender(listElem, data, checkBookListTemplate);
    })
    .catch((err) => {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
        console.error(err);
    })
};

function checkBooks() {
    const listContainerNode = document.querySelector('.return_list');

    listContainerNode.addEventListener('click', (e) => {
        const borrowId = e.target.id;
        const listItemComponent = e.target.parentNode.parentNode;
        const checkBtn = 'btn_check';

        if(e.target.classList[0] === checkBtn) {
            //url, method 수정 필요
            fetch(`/api/book/borrow/${borrowId}`, {
                method: "DELETE"
            })
            .then((res) => {
                if(res.status === 200) {
                    listItemComponent.remove();
                }
            })
            .catch((err) => {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.error(err);
            })
        }
    })
}
checkBooks();
listRendering();
