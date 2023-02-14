var heroList = $("#hero-list");
// console.log(heroList)

var storedCharacter = JSON.parse(localStorage.getItem("stored")) || [];
console.log(storedCharacter);

//document.querySelector('#reset')
var resetBtn = $("#reset");

resetBtn.on("click", function (event) {
  // what additional logic do we want to run?
  localStorage.clear();

  // reload the DOM / Browser
  location.reload();
});

// added event listener on container
heroList.on("click", function (event) {
  // console.log(event.target)
  // console.log(event.target.getAttribute('id'));
  // var removeItem = event.target.getAttribute('id');
  var removeItem = event.target;

  if (removeItem.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = removeItem.parentElement.getAttribute("data-index");
    storedCharacter.splice(index, 1);
    console.log(storedCharacter);
  }
  localStorage.setItem("stored", JSON.stringify(storedCharacter));
  location.reload();
});

function renderLi() {
  for (i = 0; i < storedCharacter.length; i++) {
    console.log(storedCharacter[i].name);
    var listItem = $("<li>")
      .text(storedCharacter[i].name)
      .addClass("listitems");
    var listBtn = $("<button>").text("X").attr("id", storedCharacter[i].name).addClass("listbuttons btn btn-info float-right text-right")

    listItem.append(listBtn);
    // console.log(listItem);
    heroList.append(listItem);

    // Given each list item data index.
    listItem.attr("data-index", i);
  }
}
renderLi();
