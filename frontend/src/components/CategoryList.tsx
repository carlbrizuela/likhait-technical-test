import { COLORS } from "../constants/colors";
import { useCategories } from "../hooks/useCategories";

export function CategoryList(){

  const { categoryList } = useCategories();

  const divStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "0.25rem", 
    textAlign: "center"
  };

  const tdStyle: React.CSSProperties = {
      padding: "0.5rem",
      border: `1px solid ${COLORS.border}`,
      color: COLORS.text.primary,
      textAlign: "center"
    };

  return(
    <div>
      {categoryList && (
        <div style={divStyle} >
          {categoryList.map((category :string) => (
            <div style={tdStyle}>
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}