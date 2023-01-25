const mongoose = require("mongoose");

const readByRecipientSchema = new mongoose.Schema(
    {
        _id: false,
        readByUserId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        readAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        timestamps: false,
    }
);

const chatMessageSchema = new mongoose.Schema(
    {
        chatRoomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'chatroom'
        },
        message: mongoose.Schema.Types.Mixed,
        postedByUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        readByRecipients: [readByRecipientSchema],

    },
    {
        timestamps: true,
        collection: "chatmessages",
    }
);

chatMessageSchema.statics.getConversationByRoomId = async function (chatRoomId, options = {}) {
    try {

        const aggregate = await this.aggregate([
            // { $match: { 
            //     chatRoomId} 
            // },

            // { $sort: { createdAt: -1 } },
            // do a join on another table called users, and 
            // get me a user whose _id = postedByUser
            {
              $lookup: {
                from: 'users',
                localField: 'postedByUser',
                foreignField: '_id',
                as: 'postedByUser',
              }
            },
            { $unwind: "$postedByUser" },
            // apply pagination
            { $skip: options.page * options.limit },
            { $limit: options.limit },
            { $sort: { createdAt: 1 } },
        ]);
        return aggregate;




        // console.log(chatRoomId)
        // return this.aggregate([
        //     { $match: { chatRoomId } },
        // //     { $sort: { createdAt: -1 } },


    } catch (error) {
        throw error;
    }
}



chatMessageSchema.statics.createPostInChatRoom = async function (chatRoomId, message, postedByUser) {
    console.log("HELLO")
    try {
        const post = await this.create({
            chatRoomId,
            message,
            postedByUser,
            readByRecipients: { readByUserId: postedByUser }
        })

        // return post
        const aggregate = await this.aggregate([
            //     // get post where _id = post._id
            //     // { $match: { _id: post._id } },
            //     //     // do a join on another table called users, and 
            //     //     // get me a user whose _id = postedByUser
            {
                $lookup: {
                    from: 'users',
                    localField: 'postedByUser',
                    foreignField: '_id',
                    as: 'postedByUser',
                }
            },
            { $unwind: '$postedByUser' },
            //     // //     // do a join on another table called chatrooms, and 
            //     // //     // get me a chatroom whose _id = chatRoomId
            {
                $lookup: {
                    from: 'chatrooms',
                    localField: 'chatRoomId',
                    foreignField: '_id',
                    as: 'chatRoomInfo',
                }
            },
            { $unwind: '$chatRoomInfo' },
            { $unwind: '$chatRoomInfo.userIds' },
            //     //     // do a join on another table called users, and 
            //     //     // get me a user whose _id = userIds
            {
                $lookup: {
                    from: 'users',
                    localField: 'chatRoomInfo.userIds',
                    foreignField: '_id',
                    as: 'chatRoomInfo.userProfile',
                }
            },
            { $unwind: '$chatRoomInfo.userProfile' },
            // group data
            {
                $group: {
                    _id: '$chatRoomInfo._id',
                    postId: { $last: '$_id' },
                    chatRoomId: { $last: '$chatRoomInfo._id' },
                    message: { $last: '$message' },
                    postedByUser: { $last: '$postedByUser' },
                    readByRecipients: { $last: '$readByRecipients' },
                    chatRoomInfo: { $addToSet: '$chatRoomInfo.userProfile' },
                    createdAt: { $last: '$createdAt' },
                    updatedAt: { $last: '$updatedAt' },
                }
            }
        ]);
        return aggregate[0];
    } catch (error) {
        throw error;
    }
}


module.exports = mongoose.model("ChatMessage", chatMessageSchema);