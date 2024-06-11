import { CSSProperties } from "react";

const divStyle: CSSProperties = {
  margin: "15px auto",
  padding: "30px",
  width: "300px",
};

const styleNames = ["title", "fieldDiv"] as const;
type StyleName = (typeof styleNames)[number];

const styles: Record<StyleName, CSSProperties> = {
  title: {
    ...divStyle,
    textAlign: "center",
  },

  fieldDiv: {
    ...divStyle,
    border: "1px solid black",
  },
};

export default styles;
