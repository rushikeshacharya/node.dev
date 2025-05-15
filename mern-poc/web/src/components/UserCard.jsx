import React from "react";

const UserCard = ({user}) => {
    console.log("User ----->", user);
    const {photoUrl, about, firstName, lastName} = user;
    
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src= {photoUrl}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName}, ${lastName}`}</h2>
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">👎</button>
          <button className="btn btn-secondary">👍</button>

        </div>
      </div>
    </div>
  );
};

export default UserCard;
