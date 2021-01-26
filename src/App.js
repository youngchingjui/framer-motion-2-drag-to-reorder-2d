import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePositionReorder } from "./use-position-reorder";
import { useMeasurePosition } from "./use-measure-position";
import "./styles.css";

export default function App() {
  const [order, updatePosition, updateOrder] = usePositionReorder(items);

  return (
    <div
      style={{
        flexDirection: "row",
        display: "flex",
        flexWrap: "wrap",
        width: 700,
      }}
    >
      {order.map((item, i) => (
        <Item
          key={item}
          item={item}
          i={i}
          updatePosition={updatePosition}
          updateOrder={updateOrder}
        />
      ))}
    </div>
  );
}

function Item({ i, item, updatePosition, updateOrder }) {
  const [isDragging, setDragging] = useState(false);

  const ref = useMeasurePosition((pos) => updatePosition(i, pos));

  return (
    <motion.div
      ref={ref}
      layout
      initial={false}
      style={{
        background: "white",
        width: 120,
        borderRadius: 5,
        zIndex: isDragging ? 3 : 1,
        height: 100,
        margin: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: 24,
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 3px 3px rgba(0,0,0,0.15)",
      }}
      whileTap={{
        scale: 1.12,
        boxShadow: "0px 5px 5px rgba(0,0,0,0.1)",
      }}
      drag={true}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onViewportBoxUpdate={(viewportBox, _) => {
        isDragging && updateOrder(i, viewportBox);
      }}
    >
      {item}
    </motion.div>
  );
}

const items = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
];
