import { ListManager } from "../module/ListManager.js";
import {friendBorrowTemplate, requestFriendBorrowTemplate} from "../module/template.js";
import {fetchFriendBorrowGet, fetchFriendBorrowPost, fetchFriendBorrowPut} from "../API/friendBorrowAPI.js";

function main () {
    const listContainer = document.querySelector('.list_container');
    const friendBorrowedBooksList = new ListManager(friendBorrowTemplate);
    const $prevPageButton = document.querySelector('.prev_btn');
    const $nextPageButton = document.querySelector('.next_btn');
    const $pageCountElement = document.querySelector('.page_count');
    let pageCount = 1;

    initializeRender(pageCount);

    $prevPageButton.addEventListener('click', () => {
        if(pageCount > 1) {
            pageCount--;
            initializeRender(pageCount);
            $pageCountElement.textContent = pageCount;
        } else {
            alert('첫번째 리스트입니다.');
        }
    });

    $nextPageButton.addEventListener('click', () => {
        if(friendBorrowedBooksList.listInfoData.length >= 9) {
            pageCount++;
            initializeRender(pageCount);
            $pageCountElement.textContent = pageCount;
        } else {
            alert('마지막 리스트입니다.');
        }
    });

    // 나에게 온 신청 조회
    const requestModalContainer = document.querySelector('.request_friend_borrow');
    const modalToggleBtn = document.querySelector('.modal_btn');
    const reqListContainer = document.querySelector('.request_borrow_list');
    const friendRequestBookList = new ListManager(requestFriendBorrowTemplate);

    modalToggleBtn.addEventListener('click', () => {
        requestModalContainer.classList.toggle('modal_hidden');
    });

    reqInitializeRender();

    function allowBorrowBook (object) {
        const { rentalId, friendId, friendName, title, imageUrl, locationUrl } = object;
        fetchFriendBorrowPut(`/api/friend/book/${rentalId}`)
            .then((res) => {
                if(res.status === 200) {
                    if(window.confirm(`${friendName}에게 빌려주시겠습니까?`)){
                        const oldList = friendRequestBookList.listInfoData;
                        const updateList = oldList.filter(item => item.rentalId !== rentalId);
                        friendRequestBookList.listInfoData = updateList;
                        friendRequestBookList.rerender();
                        setNoticeCount(updateList.length);
                    }
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }
    function setNoticeCount (count) {
        const noticeElement = document.querySelector('.request_count_notice');
        if (count === 0) {
            noticeElement.style.display = 'none';
        } else if (count > 0){
            noticeElement.style.display = 'block';
            noticeElement.textContent = count;
        }
    }


    function reqInitializeRender () {
        fetchFriendBorrowGet(`/api/friend/book?pageSize=9&pageNumber=0`)
            .then((data) => {
                friendRequestBookList.initList(data, 'normal', reqListContainer);
                friendRequestBookList.render();
                friendRequestBookList.btnAddEventListener(allowBorrowBook, 'friend_borrow_btn');
                setNoticeCount(friendRequestBookList.listInfoData.length);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    function initializeRender (pageCount) {
        fetchFriendBorrowGet(`/api/book/borrow/friend?pageSize=9&pageNumber=${pageCount}`)
            .then((data) => {
                friendBorrowedBooksList.initList(data, 'normal', listContainer);
                friendBorrowedBooksList.render();
                friendBorrowedBooksList.btnAddEventListener(clickBorrowBtn, '.borrow_btn');
            })
            .catch((err) => {
                console.error(err)
            })
    }
    function clickBorrowBtn (object) {
        const { author, imageUrl, ownerName, template, borrowId, bookId, ownerId } = object;
        if(window.confirm(`${ownerName}님에게 책을 빌리겠습니까?`)) {
            fetchFriendBorrowPost('/api/friend/book', { borrowId: borrowId, friendId: ownerId })
                .then((res) => {
                    if (res.status === 200) {
                        alert('요청완료!');
                        const oldList = friendBorrowedBooksList.listInfoData;
                        const updateList = oldList.filter(item => item.borrowId !== borrowId);
                        friendBorrowedBooksList.listInfoData = updateList;
                        friendBorrowedBooksList.rerender();
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }
}

main();
