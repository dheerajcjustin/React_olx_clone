import React, { useEffect, useContext, useState } from "react";
import { FirebaseContext } from "../../context/authContext";
import { ViewPostContext } from "../../context/viewPostContext";
import { Link, useHistory, useParams } from "react-router-dom";

import "./View.css";
function View() {
  let { id } = useParams();

  console.log(id);
  const { postDetails } = useContext(ViewPostContext);

  const { Firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const { userId } = postDetails;
    Firebase.firestore()
      .collection("userDetails")
      .where("id", "==", userId)
      .get()
      .then((res) => {
        if (res.length > 0) {
        } else {
          res.forEach((doc) => {
            setUserDeatels(doc.data());
          });
        }
        // console.log(res[0].data());
      });
    // Firebase.firestore()
    //   .collection("products")
    //   .where(Firebase.firestore.FieldPath.documentId(), "==", id)
    //   .get()
    //   .then((res) => {
    //     console.log("product detalis ", res);
    //   })
    //   .catch((error) => {
    //     alert(error.massage);
    //   });
  }, []);

  const [userDeatels, setUserDeatels] = useState();
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDeatels && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDeatels.username}</p>
            <p>{userDeatels.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
