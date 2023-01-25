const express = require("express")
const router = express.Router();

const ChatRoomController = require("../controllers/chatroom.controller")

router.post("/initiate", async (req, res) => {
    await ChatRoomController.initiateChat(req, res);
})

router.post("/message/:roomId", async (req, res) => {
    await ChatRoomController.postMessage(req, res);
})

// router.get("/:roomId", async (req, res) => {
//     await ChatRoomController.getChatRoomByRoomId(req, res);
// })
router.get("/user/roomId", async (req, res) => {
    await ChatRoomController.getChatRoomByUserId(req, res);
})

router.get("/conversation/:roomId", async (req, res) => {
    await ChatRoomController.getConversationsByRoomId(req, res);
})
module.exports = router;