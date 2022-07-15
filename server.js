/** Real-time todolist
 *
 *
 * @author: Duy Minh
 * @version: 0.1.0
 */

var express = require("express");
var http = require("http");
var application = express();
var server = http.createServer(application);

const Server = require("socket.io");
var io = Server(server);
var todoList = [];

application
  .use(express.static(__dirname + "/public"))
  .get("/todolist", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
  })
  .use("/", function (req, res) {
    res.redirect("/todolist");
  });
io.on("connection", function (serverData) {
  //first time
  serverData.emit("updateTask", todoList);

  //
  serverData.on("addTask", function (task) {
    console.log("task receive", task);
    todoList.push(task);

    io.emit("addTask", { task: task, index: todoList.length - 1 });
  });

  serverData.on("deleteTask", function (index) {
    todoList.splice(index, 1);

    io.emit("updateTask", todoList);
  });
});
server.listen(3001);
