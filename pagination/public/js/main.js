$("#pagination").pagination({
  dataSource: "/user?page=1",
  locator: "accounts",
  totalNumberLocator: function (response) {
    // you can return totalNumber by analyzing response content
    console.log(response.totalPage);
    return response.totalDoc;
  },
  pageSize: 2,
  afterPageOnClick: function (event, pageNumber) {
    loadPage(pageNumber);
  },
  afterPreviousOnClick: function (event, pageNumber) {
    loadPage(pageNumber);
  },
  afterNextOnClick: function (event, pageNumber) {
    loadPage(pageNumber);
  },
});

async function loadPage(page) {
  try {
    $("#content").html("");
    const response = await axios.get(`/user?page=${page}`);
    const accounts = response.data.accounts;
    accounts.forEach((element) => {
      let item = $(`<h3>${element.username}</h3>`);
      $("#content").append(item);
    });
  } catch (error) {
    console.log(error);
  }
}

loadPage(1);
