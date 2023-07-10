export function MyBookListTemplate (number, object) {
    const { bookName, borrowDate, deadlineDate, remainingDate, code } = object
    let btnClass ;
    let statePut ;
    if(remainingDate <= 0) {
        btnClass = 'btn_delay';
        statePut = '연체';
    } else {
        btnClass = '';
        statePut = '대출중';
    }
    const template = `
        <li class="list_item">
            <div class="list_title list_num">
                ${number}
            </div>
            <div class="list_title list_book_name">
                ${bookName}
            </div>
            <div class="list_title list_borrow_date">
                ${borrowDate}
            </div>
            <div class="list_title list_deadline_date">
                ${deadlineDate}
            </div>
            <div class="list_title list_count_date">
                ${remainingDate}일
            </div>
            <div class="list_title list_state">
                <button id="${code}" class="btn_state ${btnClass}">${statePut}</button>
            </div>
        </li>
    `;
    return template
};

export function checkBookListTemplate (number, object) {
    const { username, bookName, bookCode, borrowDate, deadlineDate, registerDate, remainingDate } = object
    function stateCircle () {
        return remainingDate >= 0 ? `` : `
        <div class="state_overdue state_circle">
            연체
        </div>`
    }
    const template = `
        <li class="list_container list_item">
            <div class="list_number">
                <span>${number}</span>
            </div>
            <div class="list_user">
                <span>${username}</span>
            </div>
            <div class="list_book_name">
                <span>${bookName}</span>
            </div>
            <div class="list_book_code">
                <span>${bookCode}</span>
            </div>
            <div class="list_borrow_date">
                <span>${borrowDate}</span>
            </div>
            <div class="list_deadline_date">
                <span>${deadlineDate}</span>
            </div>
            <div class="list_register_date">
                <span>${registerDate}</span>
            </div>
            <div class="list_state">
                ${stateCircle()}
            </div>
            <div class="list_check">
                <button id="${bookCode}" class="btn_check">완료하기</button>
            </div>
        </li>
    `;
    return template
};

export function friendListItemElem (object, option) {
    const { friendInfoId, friendId, friendName } = object;
    const listElement = document.createElement('li');
    listElement.classList.add('friend_item_container');

    const friendNameElement = document.createElement('span');
    friendNameElement.classList.add('friend_name');
    friendNameElement.textContent = friendName;

    const buttonElement = document.createElement('button');
    buttonElement.classList.add('friend_btn');
    buttonElement.textContent = option === 'list' ?
        '친구삭제' :
        (option === 'add' ?
            '친구신청' :
            '친구수락');
    if(option === 'list'){
        buttonElement.classList.add('delete_btn');
    };
    listElement.appendChild(friendNameElement);
    listElement.appendChild(buttonElement);

    return {
        template: listElement,
        friendId: friendId,
        friendName: friendName,
        type: option,
        friendInfoId: friendInfoId }
}
export function friendBorrowTemplate (object, option) {
    const { title, author, imageUrl, bookId, borrowId, ownerId, ownerName } = object;
    const type = option;
    const listElement = document.createElement('li');
    listElement.classList.add('book_list_item');

    const bookCoverElement = document.createElement('img');
    bookCoverElement.src = imageUrl;
    bookCoverElement.classList.add('book_cover');
    bookCoverElement.setAttribute('alt', '책표지');
    listElement.appendChild(bookCoverElement);

    const contentContainerElement = document.createElement('div');
    contentContainerElement.classList.add('book_detail');
    listElement.appendChild(contentContainerElement);

    const bookTitleElement = document.createElement('h4');
    bookTitleElement.textContent = title;
    contentContainerElement.appendChild(bookTitleElement);

    const authorElement = document.createElement('span');
    authorElement.textContent = `저자: ${author}`;
    contentContainerElement.appendChild(authorElement);

    const borrowButtonElement = document.createElement('button');
    borrowButtonElement.classList.add('borrow_btn');
    borrowButtonElement.textContent = '책 요청';
    contentContainerElement.appendChild(borrowButtonElement);

    const borrowUserNameElement = document.createElement('div');
    borrowUserNameElement.classList.add('owner_name');
    borrowUserNameElement.textContent = ownerName;
    listElement.appendChild(borrowUserNameElement);

    return {
        template: listElement,
        borrowId: borrowId,
        bookId: bookId,
        ownerId: ownerId,
        author: author,
        imageUrl: imageUrl,
        ownerName: ownerName }
};

export function requestFriendBorrowTemplate (object, option) {
    const { rentalId, friendId, friendName, title, imageUrl, locationUrl } = object;
    const type = option;
    const listElement = document.createElement('li');
    listElement.classList.add('request_borrow_item');

    const requestUsername = document.createElement('span');
    requestUsername.classList.add('request_username');
    requestUsername.textContent = friendName;
    listElement.appendChild(requestUsername);

    const bookCover = document.createElement('img');
    bookCover.src = imageUrl;
    bookCover.classList.add('request_book_cover');
    bookCover.setAttribute('alt', '책표지');
    listElement.appendChild(bookCover);

    const bookTitle = document.createElement('span');
    bookTitle.classList.add('request_book_title');
    bookTitle.textContent = title;
    listElement.appendChild(bookTitle);

    const allowBtn = document.createElement('friend_borrow_btn');
    allowBtn.classList.add('friend_borrow_btn');
    allowBtn.textContent = '빌려주기';
    listElement.appendChild(allowBtn);

    return {
        template: listElement,
        rentalId: rentalId,
        friendId: friendId,
        friendName: friendName,
        title: title,
    }
}

export function myBookListTemplate (object) {
    const { borrowId, bookId, title, author, imageUrl, locationUrl } = object;
    const listElement = document.createElement('li');
    listElement.classList.add('list_item');

    const listNumber = document.createElement('span');
    listNumber.classList.add('list_number');
    listNumber.setAttribute('alt', '책 표지');

    const bookCover = document.createElement('img');
    bookCover.src = imageUrl;

    const bookTitle = document.createElement('span');
    bookTitle.classList.add('book_title');
    bookTitle.textContent = title;

    const bookAuthor = document.createElement('span');
    bookAuthor.classList.add('book_author');
    bookAuthor.textContent = author;

    const borrowState = document.createElement('div');
    borrowState.classList.add('borrow_state');
    borrowState.textContent = '대출중';

    listElement.appendChild(listNumber);
    listElement.appendChild(bookCover);
    listElement.appendChild(bookTitle);
    listElement.appendChild(bookAuthor);
    listElement.appendChild(borrowState);
    console.log(listElement);

    return {
        template: listElement,
        borrowId: borrowId,
        bookId: bookId,
        title: title,
        author: author,
        imageUrl: imageUrl,
        locationUrl: locationUrl,
    }
}