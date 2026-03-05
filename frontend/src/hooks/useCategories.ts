import { useEffect, useState } from "react";
import { fetchCategories } from "../services/api";

export const useCategories = () => {
  const [categoryList, setCategoryList] =  useState<string[]>([])

  useEffect(() => {
      const loadCategories = async () => {
        try{
          const fetchedCategories = await fetchCategories()
          const categoryNames = fetchedCategories.map((category) => category.name)
          setCategoryList(categoryNames)
        } catch (error) {
          console.error("Failed to load categories:", error);
          setCategoryList([]);
        }
      }
      loadCategories();

    }, []);

    return { categoryList };
  }