import { ListManager } from "../module/ListManager.js";
import { friendListItemElem } from "../module/template.js";
import {friendListGet, friendListPost, friendListPut} from "../API/friendListAPI.js";

function main () {
    //친구 목록 리스트
    const friendList = new ListManager(friendListItemElem);
    const $listElem = document.getElementById('friends_list');
    const $prevFriendListBtn = document.getElementById('prev_list');
    const $nextFriendListBtn = document.getElementById('next_list');
    const $friendListCount = document.getElementById('prev_list_count');
    let friendListPage = 1;

    friendListRender(friendListPage);

    $prevFriendListBtn.addEventListener('click', () => {
        if(friendListPage > 1) {
            friendListPage--;
            friendListRender(friendListPage);
            $friendListCount.textContent = friendListPage;
        } else {
            alert('첫번째 리스트입니다.');
        }
    });

    $nextFriendListBtn.addEventListener('click', () => {
        if(friendList.listInfoData.length >= 10) {
            friendListPage++;
            friendListRender(friendListPage);
            $friendListCount.textContent = friendListPage;
        } else {
            alert('마지막 리스트입니다.');
        }
    });

    function friendListRender (page) {
        friendListGet(`/api/friend?pagSize=10&pageNumber=${page}`)
        .then((data) => {
            friendList.initList(data, 'list', $listElem);
            friendList.render();
            friendList.btnAddEventListener(btnDeleteList, '.friend_btn');
        })
        .catch((err) => {
            console.error(err)
        })
    };


    //친구 추가 리스트
    const friendAdd = new ListManager(friendListItemElem);
    const $listAddElem = document.getElementById('friends_add_list');
    const $prevFriendAddBtn = document.getElementById('prev_list_add');
    const $nextFriendAddBtn = document.getElementById('next_list_add');
    const $friendAddCount = document.getElementById('prev_list_add_count');
    let friendAddListPage = 1;

    friendAddRender(friendAddListPage);

    $prevFriendAddBtn.addEventListener('click', () => {
        if(friendAddListPage > 1) {
            friendAddListPage--;
            friendAddRender(friendAddListPage);
            $friendAddCount.textContent = friendAddListPage;
        } else {
            alert('첫번째 리스트입니다.');
        }
    });

    $nextFriendAddBtn.addEventListener('click', () => {
        if(friendAdd.listInfoData.length >= 5) {
            friendAddListPage++;
            friendAddRender(friendAddListPage);
            $friendAddCount.textContent = friendAddListPage;
        } else {
            alert('마지막 리스트입니다.');
        }
    });

    function friendAddRender (page) {
        friendListGet('/api/friend/member?pageSize=5&pageNumber=0')
        .then((data) => {
            friendAdd.initList(data, 'add', $listAddElem);
            friendAdd.render();
            friendAdd.btnAddEventListener(btnReqList, '.friend_btn');
        })
        .catch((err) => {
            console.error(err)
        })
    };

    //친구 요청 리스트
    const friendReq = new ListManager(friendListItemElem);
    const $listReqElem = document.getElementById('friends_req_list');
    const $prevFriendReqBtn = document.getElementById('prev_list_req');
    const $nextFriendReqBtn = document.getElementById('next_list_req');
    const $friendReqCount = document.getElementById('prev_list_req_count');
    let friendRequestListPage = 1;

    friendReqRender(friendRequestListPage);

    $prevFriendReqBtn.addEventListener('click', () => {
        if(friendRequestListPage > 1) {
            friendRequestListPage--;
            friendReqRender(friendRequestListPage);
            $friendReqCount.textContent = friendRequestListPage;
        } else {
            alert('첫번째 리스트입니다.');
        }
    });

    $nextFriendReqBtn.addEventListener('click', () => {
        if(friendReq.listInfoData.length >= 5) {
            friendRequestListPage++;
            friendReqRender(friendRequestListPage);
            $friendReqCount.textContent = friendRequestListPage;
        } else {
            alert('마지막 리스트입니다.');
        }
    });

    function friendReqRender (page) {
        friendListGet('/api/friend/request?pageSize=5&pageNumber=0')
        .then((data) => {
            friendReq.initList(data, 'req', $listReqElem);
            friendReq.render();
            friendReq.btnAddEventListener(btnAddList, '.friend_btn');
            settingFriendsNotice(friendReq.listInfoData.length);
        })
        .catch((err) => {
            console.error(err)
        })
    }

    //리스트 버튼 이벤트
    function btnAddList (listObj, friendName) {
        if(window.confirm('추가하시겠습니까?')){
            friendListPut(`/api/friend/${listObj.friendInfoId}`)
                .then((res) => {
                    if(res.status === 200) {
                        const addElem = friendReq.listInfoData.filter(item => item.friendInfoId === listObj.friendInfoId);
                        friendReq.listInfoData = friendReq.listInfoData.filter(item => item !== addElem[0]);
                        friendReq.rerender();
                        settingFriendsNotice(friendReq.listInfoData.length);
                        friendListRender(0);
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }

    function btnDeleteList (listObj) {
        // API 미구현
        if(window.confirm('친구를 삭제하시겠습니까?')) {
            const oldList = friendList.listInfoData;
            const updateList = oldList.filter(item => item.friendId !== listObj.friendId);
            friendList.listInfoData = updateList;
            friendList.rerender();
        }
    }
    function btnReqList (listObj) {
        if(window.confirm('친구신청을 하시겠습니까?')) {
            friendListPost('/api/friend', { friendId: listObj.friendId })
                .then((res) => {
                    if(res.status === 200) {
                        const oldList = friendAdd.listInfoData;
                        const updateList = oldList.filter(item => item.friendId !== listObj.friendId);
                        friendAdd.listInfoData = updateList;
                        friendAdd.rerender();
                    }
                })
                .catch((err) => {
                    alert('친구신청을 실패하였습니다.');
                    console.error(err);
                })
        }
    }

    //친구설정 버튼
    const $settingFriendsBtn = document.querySelector('.friends_setting_btn');
    const $contentContainerElem = document.querySelector('.contents_container');
    $settingFriendsBtn.addEventListener('click', () => {
        $contentContainerElem.classList.toggle('setting_friends');
    });
    //친구설정 알림
    function settingFriendsNotice (count) {
        const $noticeElem = document.querySelector('.notice_count');
        if(count === 0) {
            $noticeElem.style.backgroundColor = 'white';
            $noticeElem.textContent = count;
        } else {
            $noticeElem.textContent = count;
        }
    };
}

main();
