import React, { useEffect, useState } from "react";
import { IPost } from "../models/IPost";
import { postAPI } from "../services/PostService";
import PostItem from "./PostItem";

const PostContainer = () => {
  const [limit, setLimit] = useState(20);
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = postAPI.useFetchAllPostsQuery(limit, {
    // pollingInterval: 1000 // промежуток, через который данные будут обновлены
  });

  const [createPost, {}] = postAPI.useCreatePostMutation();
  const [updatePost, {}] = postAPI.useUpdatePostMutation();
  const [deletePost, {}] = postAPI.useDeletePostMutation();


  useEffect(() => {
    /*setTimeout(() => {
        setLimit(3);
    }, 2000);*/
  }, []);

  const handleCreate = async () => {
    const title = prompt();
    await createPost({ title, body: title } as IPost);
  };

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  }

  return (
    <div>
      <div>
        <button onClick={handleCreate}>Add new post</button>
        {isLoading && <h1>Loading</h1>}
        {error && <h1>Error</h1>}
        {posts &&
          posts?.map((post) => {
            return <PostItem
              remove={handleRemove}
              update={handleUpdate}
              key={post.id}
              post={post}
            ></PostItem>;
          })}
      </div>
    </div>
  );
};

export default PostContainer;
