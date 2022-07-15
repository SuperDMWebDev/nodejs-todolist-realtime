/**
 *
 * @author: Duy Minh
 * @version:0.1.0
 */

var socket = io.connect("http://localhost:3001");

$(`#todolistForm`).submit(function () {
  var task = $("#task").val();
  socket.emit("addTask", task);

  insertTask(task, index);
  $("#task").val("").focus();
});

socket.on("updateTask", function (todoList) {
  $("#todolist").empty(); // remove all child node
  todoList.forEach((task, index) => {
    insertTask(task, index);
  });
});

/**
 *
 * @param {string} task
 * @param {int} index
 */
function insertTask(task, index) {
  // Use data- attribute for position index in array
  $("#todolist").append(
    '<li><a class="delete" href="#" data-index="' +
      index +
      '">✘</a> ' +
      task +
      "</li>"
  );
}
$("#todolist").on("click", ".delete", function () {
  socket.emit("deleteTask", $(this).attr("data-index"));
});
