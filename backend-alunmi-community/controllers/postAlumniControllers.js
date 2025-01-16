const base_URL = process.env.BASE_URL || 'http://localhost:5000';
const { log } = require('console');
const postAlumniModel = require('../models/postAlumniModel')
const userModel = require('../models/userModel')
const fs = require('fs')




exports.postAlumniSelectDay = async (req, res) => {
  try {
    const { timeFrame } = req.body; // รับค่าช่วงเวลาจาก query parameter
    let dateFilter = {};
    const now = new Date();

    if (timeFrame === 'today') {
      // กรองข้อมูลของวันนี้
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      dateFilter = { createdAt: { $gte: startOfDay } };
    } else if (timeFrame === '3days') {
      // กรองข้อมูลของ 3 วันที่ผ่านมา
      const threeDaysAgo = new Date(now.setDate(now.getDate() - 3));
      dateFilter = { createdAt: { $gte: threeDaysAgo } };
    } else if (timeFrame === '7days') {
      // กรองข้อมูลของ 7 วันที่ผ่านมา
      const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
      dateFilter = { createdAt: { $gte: sevenDaysAgo } };
    } else if (timeFrame === 'all'){
      const docs = await postAlumniModel.find().populate({
        path: "user",
        select: ["name", "studentId", "image"]
      }).populate({
        path: "topic",
        select: ["nameTopic", "color"]
      }).lean();
  
      return res.status(200).send(docs);

    }

    const docs = await postAlumniModel.find(dateFilter).populate({
      path: "user",
      select: ["name", "studentId", "image"]
    }).populate({
      path: "topic",
      select: ["nameTopic", "color"]
    }).lean();

    res.status(200).send(docs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.postAlumniGettoDay = async (req, res) => {
  try {
    const now = new Date();

    let dateFilter = {};
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    dateFilter = { createdAt: { $gte: startOfDay } };

    
    const docs = await postAlumniModel.find(dateFilter).populate({
      path: "user",
      select: ["name", "studentId", "image"]
    }).populate({
      path: "topic",
      select: ["nameTopic", "color"]
    }).lean();
    
    res.status(200).send(docs);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

exports.postAlumniGetAll = async (req, res) => {
  try {
    const docs = await postAlumniModel.find().populate({
      path: "user",
      select: ["name", "studentId", "image"]
    }).populate({
      path: "topic",
      select: ["nameTopic", "color"]
    }).lean();
    res.status(200).send(docs);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

exports.postAlumniGetById = async (req, res) => {
  try {
    const id = req.params.id;
    const docs = await postAlumniModel.find({ user: id }).populate({
      path: "user",
      select: ["name", "studentId", "image"]
    }).populate({
      path: "topic",
      select: ["nameTopic", "color"]
    }).lean();
    res.status(200).send(docs);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
exports.postAlumniGetByIdTopic = async (req, res) => {
  try {
    const id = req.params.id;
    const docs = await postAlumniModel.find({ topic: id }).lean();
    res.status(200).send(docs);
  } catch (error) {
    res.status(500).send(error.message);
  }
}


exports.postAlumniCreate = async (req, res) => {
  try {
    const data = req.body;

    if (req.files) {
      const imagePaths = req.files.map(file => `${base_URL}/uploads/${file.filename}`);
      data.image = imagePaths; 
    }

    const doc = new postAlumniModel(data);
    const item = await doc.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(500).send(error.message);
  }
}


exports.postAlumniUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;

    if (req.files) {

      const oldPost = await postAlumniModel.findById(id).select('image -_id');
      const oldImages = oldPost.image.map(image => image.replace(/^.*\/uploads\//, ""));

      for (const oldImage of oldImages) {
        await fs.unlink('./uploads/' + oldImage, (err) => {
          if (err) console.log(err);
          else console.log(`Removed image: ${oldImage}`);
        });
      }

      const imagePaths = req.files.map(file => `${base_URL}/uploads/${file.filename}`);
      update.image = imagePaths;
    }

    const doc = await postAlumniModel.findByIdAndUpdate(id, update, { new: true });
    res.status(200).send(doc);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

exports.postAlumniRemove = async (req, res) => {
  try {
    const id = req.params.id;

    const oldPost = await postAlumniModel.findById(id).select('image -_id');
    const oldImages = oldPost.image.map(image => image.replace(/^.*\/uploads\//, ""));

    for (const oldImage of oldImages) {
      await fs.unlink('./uploads/' + oldImage, (err) => {
        if (err) console.log(err);
        else console.log(`Removed image: ${oldImage}`);
      });
    }

    const doc = await postAlumniModel.findByIdAndDelete(id);
    res.status(200).send(doc);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};


exports.addComment = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id; // ID ของโพสต์
    const newComment = {
      userid: data.userid,
      usercomment: data.usercomment,
      userimagecomment: data.userimagecomment,
      comment: data.comment,
      timestamp: new Date().toISOString(),
    };

    console.log('Post ID:', id, 'New Comment:', newComment);

    // หาโพสต์ที่ต้องการเพิ่มคอมเมนต์
    const post = await postAlumniModel.findById(id);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    // เพิ่มคอมเมนต์ใหม่ในฟิลด์ comments
    post.comments.push(newComment);

    // บันทึกโพสต์ที่อัปเดตแล้ว
    await post.save();

    res.status(200).send('Comment added successfully!');
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).send('Internal server error');
  }
};

// ฟังก์ชันดึงข้อมูลโพสต์พร้อมคอมเม้นท์
exports.getComments = async (req, res) => {
  try {
    const postId = req.params.id; // ID of the post

    // Fetch the post by its ID
    const post = await postAlumniModel.findById(postId, 'comments'); // Only fetch the `comments` field

    if (!post) {
      return res.status(404).send('Post not found');
    }

    // Send the comments back as the response
    res.status(200).json(post.comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('Internal server error');
  }
};

// ฟังก์ชันอัปเดตคอมเม้นท์
exports.editComment = async (req, res) => {
  try {
    const postId = req.params.id; // ID of the post
    const commentId = req.params.commentId; // ID of the comment to edit
    const { usercomment, userimagecomment, comment } = req.body;

    console.log('Post ID:', postId, 'Comment ID:', commentId, 'Updated Data:', { usercomment, userimagecomment, comment });
    const post = await postAlumniModel.findById(postId);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    const targetComment = post.comments.id(commentId);
    if (!targetComment) {
      return res.status(404).send('Comment not found');
    }
    if (usercomment !== undefined) targetComment.usercomment = usercomment;
    if (userimagecomment !== undefined) targetComment.userimagecomment = userimagecomment;
    if (comment !== undefined) targetComment.comment = comment;
    targetComment.timestamp = new Date().toLocaleString();
    await post.save();

    res.status(200).send('Comment updated successfully!');
  } catch (error) {
    console.error('Error editing comment:', error);
    res.status(500).send('Internal server error');
  }
};

// ฟังก์ชันลบคอมเม้นท์
exports.deleteComment = async (req, res) => {
  try {
    const data = req.body;
    const postId = req.params.id; 
    const commentId = req.params.commentId; 
    const newComment = {
      userid: data.userid,
      usercomment: data.usercomment,
      userimagecomment: data.userimagecomment,
      comment: data.comment,
      timestamp: new Date().toLocaleString(),
    };
    console.log('Post ID:', postId, 'Comment ID:', commentId, );
    const post = await postAlumniModel.findById(postId);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    const targetComment = post.comments.find(
      (comment) => comment._id.toString() === commentId
    );
    if (!targetComment) {
      return res.status(404).send('Comment not found');
    }
    if (targetComment.userid == data._id ) {
      return res.status(403).send('You are not authorized to delete this comment');
    }
    post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );
    await post.save();
    res.status(200).send('Comment deleted successfully!');
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).send('Internal server error');
  }
};

// จำนวนผู้ชมแต่ละ post
exports.incrementVisitPost = async (req, res) => {
  try {
    const { id } = req.params; 
    if (!id) {
      return res.status(400).json({ error: "Post ID is required" });
    }
    const result = await postAlumniModel.findByIdAndUpdate(
      id,
      { $inc: { visitedpost: 1 } }, 
      { new: true } 
    );
    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ visitedpost: result.visitedpost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update visit count" });
  }
};
exports.getVisitCountPost = async (req, res) => {
  try {
    const { id } = req.params; 
    if (!id) {
      return res.status(400).json({ error: "Post ID is required" });
    }
    const result = await postAlumniModel.findById(id);
    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ visitedpost: result.visitedpost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch visit count" });
  }
};