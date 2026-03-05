/**
 * Form component for adding categories
 */

import React, { useState } from "react";
import { Button, TextField } from "../vibes";
import { CategoryList } from "./CategoryList";

interface CategoryFormProps {
  onSubmit: (category: string) => Promise<void>;
  onCancel?: () => void;
  error?: string; 
  setError: (error: string) => void;
}

export function CategoryForm({ onSubmit, onCancel, error, setError}: CategoryFormProps){

  const [category, setCategory] = useState("")
  const [listModal, setListModal] = useState(false);

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.5rem",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(category)
    } catch (error) {
      console.error("Form submission error:", error);
    }
  }

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
    setError(""); // clear error as user types
  };

  const toggleModal = () => {
    setListModal(prev => !prev);
  }

  const modalStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
  }

  const showStyle: React.CSSProperties = {
    cursor:"pointer",
    margin: "2px",
    textDecoration: "underline",
    fontSize: "small",
    color: "blue"
  }

  return (
    <div style={modalStyle}>
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={handleInputChange}
            required
            error = {error}
          />

          <div style={buttonGroupStyle}>
            <Button
              type="submit"
              variant="success"
              fullWidth
            >
              Add Category
            </Button>
            
            { onCancel && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
            )}
          </div>  
        </form>

        <p style={showStyle} onClick={toggleModal}>
          { listModal ? "Hide categories":"Show categories"}
        </p>
      </div>

      { listModal && <CategoryList /> }
    </div>
  );
}
