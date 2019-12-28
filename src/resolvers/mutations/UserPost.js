const getUserId = require("../../utils/getUserId");
const s3Upload = require("../../utils/s3Upload");

module.exports = {
  async createPost(_, args, { photon, request }, info) {
    const userId = getUserId(request);

    // upload post media to s3
    const media = await Promise.all(
      args.data.media.map(file => s3Upload(file))
    );

    // create post
    return await photon.posts.create(
      {
        data: {
          author: {
            connect: {
              id: userId
            }
          },
          media: {
			  create: media
		  },
          description: args.data.description
        }
      },
      info
    );
  }
};