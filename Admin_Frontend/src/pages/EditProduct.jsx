import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateProduct } from "../redux/productReducer/action";
import { useToast } from "@chakra-ui/react";
import "../styles/main.css";

function EditProduct() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const product = useSelector((store) => store.productReducer.products);
  const { updateSuccess, message, isError } = useSelector(
    (store) => store.productReducer
  );


  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  function handleForm(e) {
    e.preventDefault();
    setIsUpdating(true);
    dispatch(updateProduct(data, id));
  }

  useEffect(() => {
    const data = product.find((el) => el._id === id);
    setData(data);
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      setIsUpdating(false);
      toast({
        title: message,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  }, [updateSuccess, isUpdating]);

  return (
    <div>
      <h1 className="titleText">Edit Page</h1>
      <form className="main-form" onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Image_URL"
          name={"image"}
          onChange={handleInput}
          value={data?.image}
        />
        <input
          type="text"
          placeholder="Title"
          name={"title"}
          onChange={handleInput}
          value={data?.title}
        />
        <input
          type="text"
          placeholder="Description"
          name={"description"}
          onChange={handleInput}
          value={data?.description}
        />
        <input
          type="number"
          placeholder="Price"
          name={"price"}
          onChange={handleInput}
          value={data?.price}
        />
        <input
          className="normalBtn inputBtn"
          type="submit"
          value={isUpdating ? "Updating" : "Submit"}
        />
      </form>
    </div>
  );
}

export default EditProduct;
