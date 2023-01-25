const mongoose = require("mongoose");
const Schema = mongoose.Schema
// const chatRoomSchema = new mongoose.Schema(
//     // {

//     //     userIds: Array,
//     //     type: String,
//     //     chatInitiator: String,
//     // },
//     // {
//     //     timestamps: true,
//     //     collection: "chatrooms",
//     // }
// );

const chatRoomSchema = new Schema({
    userIds: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }

        ],
        required: true,
        ref: 'user'
    },
    chatInitiator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, { timestamps: true });



chatRoomSchema.statics.getChatRoomsByUserId = async function (userId) {
    try {
        const rooms = await this.find({ userIds: { $all: [userId] } }).populate('userIds');
        return rooms;
    } catch (error) {
        throw error;
    }
}
chatRoomSchema.statics.getChatRoomByRoomId = async function (roomId) {
    try {
        const room = await this.findOne({ _id: roomId }).populate(['userIds', 'chatInitiator']);
        return room;
    } catch (error) {
        throw error;
    }
}


chatRoomSchema.statics.initiateChat = async function (
    userIds, chatInitiator
) {
    try {
        const availableRoom = await this.findOne({
            userIds: {
                $size: userIds.length,
                $all: [...userIds],
            },

        });
        if (availableRoom) {
            console.log("inside")
            return {
                isNew: false,
                message: 'retrieving an old chat room',
                chatRoomId: availableRoom._doc._id,

            };
        }

        const newRoom = await this.create({ userIds, chatInitiator });
        return {
            isNew: true,
            message: 'creating a new chatroom',
            chatRoomId: newRoom._doc._id,

        };
    } catch (error) {
        console.log('error on start chat method', error);
        throw error;
    }
}

module.exports = mongoose.model("chatRoom", chatRoomSchema);