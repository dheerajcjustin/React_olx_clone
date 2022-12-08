import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../context/authContext";
import { Link, useHistory } from "react-router-dom";

const Create = () => {
  const navigate = useHistory();

  const { Firebase } = useContext(FirebaseContext);
  const { loginStuatus } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const date = new Date().dateToString();
  const sumbitButtonHandler = (e) => {
    e.preventDefault();
    console.log(name, category, price);
    // Firebase.storage()
    //   .ref(`image/${image.name}`)
    //   .put(image)
    //   .then(({ ref }) => {
    //     ref.getDownloadURL().then((url) => {
    //       console.log("url of the file is ", url);
    //     });
    //   });
    Firebase.storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          console.log(url);
          Firebase.firestore()
            .collection("products")
            .add({
              name,
              category,
              price,
              url,
              userId: loginStuatus.uid,
              createdAt: date,
            })
            .then(() => {
              navigate.push("/");
            });
        });
      });
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              value={name}
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              value={category}
              className="input"
              type="text"
              id="category"
              name="category"
              defaultValue="John"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <br />
            <label htmlFor="Price">Price</label>
            <br />
            <input
              value={price}
              className="input"
              type="number"
              id="Price"
              name="Price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <br />
          </form>
          <br />
          {image ? (
            <img
              alt="Posts"
              width="200px"
              height="200px"
              src={URL.createObjectURL(image)}
            ></img>
          ) : (
            ""
          )}

          <form onSubmit={sumbitButtonHandler}>
            <br />
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <br />
            <button className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
