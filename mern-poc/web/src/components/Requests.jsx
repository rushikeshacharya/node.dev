import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestsSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const handleSendRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(requestId));
      fetchRequests();
    } catch (error) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <>
      <h1 className="text-center text-bold text-white text-3xl my-5">
        Connection Requests
      </h1>

      <div className="flex justify-center text-center my-5">
        {requests.map((req) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            req.fromUserId;
          return (
            <div
              key={_id}
              className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300  mx-auto"
            >
              <div>
                <img
                  alt="photo"
                  className="w-20 h-20 rounded-full"
                  src={photoUrl}
                />
              </div>
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstName}, {lastName}
                </h2>
                <p>
                  {age}, {gender}
                </p>
                <h4>{about}</h4>
              </div>
              <div>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => handleSendRequest("rejected", req._id)}
                >
                  👎 Reject
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => handleSendRequest("accepted", req._id)}
                >
                  👍 Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Requests;
