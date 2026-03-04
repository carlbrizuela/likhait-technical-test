/**
 * Form component for adding categories
 */

import React, { useState } from "react";
import { Button, TextField } from "../vibes";

interface CategoryFormProps {
  onSubmit: (category: string) => Promise<void>;
  onCancel?: () => void;
  error?: string; 
  setError: (error: string) => void;
}

export function CategoryForm({ onSubmit, onCancel, error, setError}: CategoryFormProps){

  const [category, setCategory] = useState("")

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

  return (
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
          // disabled={isSubmitting}
          fullWidth
        >
        Add Category
        {/* {isSubmitting ? "Submitting..." : submitLabel} */}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            // disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
            </div>  
      </form>
  );
}
