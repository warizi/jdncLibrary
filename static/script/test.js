(async function e () {
  const response = await fetch("/api/book/borrow/my");
  const data = await response.json();
  console.log(data);
})()