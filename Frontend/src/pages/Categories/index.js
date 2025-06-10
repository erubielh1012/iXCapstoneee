import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import CategoryList from '../../components/CategoryList';
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";

import "../../App.css";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import AddEditCategoryModal from "../../components/AddEditCategoryModal";
import DeleteCategoryModal from "../../components/DeleteCategoryModal";

import { 
  fetchCategories, 
  setAddCategory, 
  resetSuccessAndError 
} from '../../features/categoriesSlice';

export default function CategoriesPage() {

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const {
    categories,
    isLoading,
    isSuccess,
    isError,
    message,
  } = useSelector((state) => (state.categories))

  useEffect(() => {
    dispatch(fetchCategories());
    return () => dispatch(resetSuccessAndError());
  }, [dispatch]);

  const onCategoryAdd = () => {
    dispatch(setAddCategory({
      title: "",
      description: "",
      color: "#000000"
    }))
  }

  const AddButton = () => {
    if (!user?.token) return null;
    return (
      <button className="btn btn-outline-dark h-75" onClick={onCategoryAdd}>
        ADD CATEGORY
      </button>
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="page-subtitle">Categories</p>
          <AddButton />
        </div>
        <CategoryList
          isHome={false}
          categories={categories}
        ></CategoryList>
      </div>
      <Footer />
      <AddEditCategoryModal/>
      <DeleteCategoryModal/>
      {/* <SuccessToast
        show={isSuccess}
        message={message}
        onClose={() => {
          dispatch(resetSuccessAndError());
        }}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={() => {
          dispatch(resetSuccessAndError());
        }}
      /> */}
    </>
  );
}