export function ListManager (listElem) {
    this.data;
    this.listElem = listElem;
    this.listContainer;
    this.listInfoData = [];
};
//data : fetchAPI data, type : 한 페이지에서 각 리스트를 구분하기위한 type, dom : ul Element
// type 에시 : 친구목록='list', 친구추가='add', 친구요청='req' // 각리스트에 맞는 이벤트리스너를 부여하기 위해 구분합니다.
ListManager.prototype.initList = function (data, type, dom) {
    this.listContainer = dom
    this.data = data;
    this.listInfoData = [];
    while (this.listContainer.firstChild) {
        this.listContainer.removeChild(this.listContainer.firstChild);
    };
    data.forEach((item) => {
        this.listInfoData.push(this.listElem(item, type));
    });
};
// render는 기존 리스트 밑에 새로운 리스트를 렌더링을 합니다.
ListManager.prototype.render = function () {
    this.listInfoData.forEach((item) => {
        this.listContainer.appendChild(item.template);
    });
};
ListManager.prototype.search = function (searchString, type) {
    let result;

    if(searchString === '') {
        result = this.data;
    } else {
        result = this.data.filter(item => item.friendName === searchString);
    }

    this.listInfoData = [];
    result.forEach((item) => {
        this.listInfoData.push(this.listElem(item, 'add'));
    });

    this.rerender();
}
// rerender는 기존 리스트를 지우고 새로 리스트를 렌더링합니다.
ListManager.prototype.rerender = function () {
    while (this.listContainer.firstChild) {
        this.listContainer.removeChild(this.listContainer.firstChild);
    };
    this.render();
}
ListManager.prototype.btnAddEventListener = function (eventFn, btnClass) {
    this.listInfoData.forEach((item) => {
        const btnElem = item.template.querySelector(btnClass);
        btnElem.addEventListener('click', () => {
            eventFn(item);
        })
    })
}
