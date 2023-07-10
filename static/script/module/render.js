export function listRender(dom, array, template) {
    const renderArray = array;
    const newArray = renderArray.map((item, index) => {
        return template(index + 1, item)
    })
    dom.innerHTML = newArray.reduce((acc, item) => {
        return acc + item
    });
}
