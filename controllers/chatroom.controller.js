const User = require('../models/user.model')
const ChatRoomModel = require('../models/chatroom.model')
const httpStatusCodes = require('../constants/http-status-codes');
const { formResponse } = require("../helpers/response");

const ChatMessageModel = require('../models/chatmessage.model')

exports.initiateChat = async (req, res, next) => {

    console.log("hello")
    try {
        const receiverId = req.body.receiverId;
        const {
            userId: chatInitiator
        } = req;
        const allUserIds = [receiverId, chatInitiator];
        const chatRoom = await ChatRoomModel.initiateChat(allUserIds, chatInitiator);
        return res.status(httpStatusCodes[200].code)
            .json(formResponse(httpStatusCodes[200].code, chatRoom));
    }
    catch {
        res.status(httpStatusCodes[500].code)
            .json(formResponse(httpStatusCodes[500].code, "Chatroom Not created"));
    }

}

exports.postMessage = async (req, res, next) => {


    try {
        const { roomId } = req.params;
        const messagePayload = {
            message: req.body.message,
        };
        const currentLoggedUser = req.userId;

        const post = await ChatMessageModel.createPostInChatRoom(roomId, messagePayload, currentLoggedUser);

        global.io.sockets.in(roomId).emit('new message', { message: post });
        return res.status(200).json({ success: true, post });
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }

}

exports.getChatRoomByRoomId = async (req, res) => {

    try {
        const { roomId } = req.params;
        const room = await ChatRoomModel.getChatRoomByRoomId(roomId)
        if (!room) {
            return res.status(400).json({
                success: false,
                message: 'No room exists for this id',
            })
        }
        else {
            return res.status(200).json({
                success: true,
                message: room,
            })
        }
    }
    catch {
        return res.status(500).json({ success: false, error });
    }
}

exports.getChatRoomByUserId = async (req, res) => {

    try {
        const currentLoggedUser = req.userId;
        const options = {
            page: parseInt(req.query.page) || 0,
            limit: parseInt(req.query.limit) || 10,
        };
        const rooms = await ChatRoomModel.getChatRoomsByUserId(currentLoggedUser)
        // const roomIds = rooms.map(room => room._id);
        if (!rooms) {
            return res.status(400).json({
                success: false,
                message: 'No room exists for this id',
            })
        }
        else {
            return res.status(200).json({
                success: true,
                message: rooms,
            })
        }
    }
    catch {
        return res.status(500).json({ success: false, error });
    }
}

exports.getConversationsByRoomId = async (req, res) => {

    try {
        const { roomId } = req.params;
        console.log(roomId)
        const room = await ChatRoomModel.getChatRoomByRoomId(roomId)
        if (!room) {
            return res.status(400).json({
                success: false,
                message: 'No room exists for this id',
            })
        }
        // const users = await UserModel.getUserByIds(room.userIds);
        const options = {
            page: parseInt(req.query.page) || 0,
            limit: parseInt(req.query.limit) || 10,
        };
        console.log("hello")
        const conversation = await ChatMessageModel.getConversationByRoomId(roomId, options);
        return res.status(200).json({
            success: true,
            conversation,
            //   users,
        });
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }

}