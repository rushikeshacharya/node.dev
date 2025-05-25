import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);

  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchConnections();
    return () => {};
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1> No connections Found </h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-4xl"> Connections</h1>
      {connections.map((conn) => {
        const { _id, firstName, lastName, gender, age, photoUrl, about } = conn;
        return (
          <div key={_id} className=" flex m-4 p-4 bg-base-300 w-1/2 mx-auto">
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
            <Link to={"/chat/" + _id}>
              <button className="btn btn-primary flex justify-end">
                Chat 💬
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
