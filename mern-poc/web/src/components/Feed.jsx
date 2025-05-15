import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed, removeFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      //TODO:
    }
  };
  useEffect(() => {
    getFeed();
    return () => {};
  }, []);

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[1]} />
      </div>
    )
  );
};

export default Feed;
