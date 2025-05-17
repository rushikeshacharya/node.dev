import React from "react";

const UserCard = ({user}) => {
    const {photoUrl, about, firstName, lastName, age, gender, skills} = user;
    
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src= {photoUrl}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName}, ${lastName}`}</h2>
        <h5 className="card-title text-sm">{`${gender}, ${age}`}</h5>
        <h4 className="card-title text-sm">{`Skills: ${skills}`}</h4>
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
