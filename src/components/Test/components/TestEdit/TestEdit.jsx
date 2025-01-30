import { useState } from "react";
import { Accordion } from "../Accordion/Accordion";

export const TestEdit = () => {
  const [editData, setEditData] = useState([]);
  return <Accordion editData={editData} setEditData={setEditData} />;
};
