import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, photoUrl, about, firstName, lastName, age, gender, skills } =
    user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {}
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName}, ${lastName}`}</h2>
        <h5 className="card-title text-sm">{`${gender}, ${age}`}</h5>
        <h4 className="card-title text-sm">{`Skills: ${skills}`}</h4>
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            👎
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            👍
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
