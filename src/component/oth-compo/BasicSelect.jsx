import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useMyStore from "../../store/store";

export default function BasicSelect() {
 const [itemCat, setItemCat] = React.useState([]);
 const selectValue = useMyStore((state) => state.selectValue);
 const setSelectValue = useMyStore((state) => state.setSelectValue);

 React.useEffect(() => {
  const getData = async () => {
   const res = await fetch("https://dummyjson.com/products?limit=300&skip=0");
   const data = await res.json();
   const cats = [...new Set(data.products.map((c) => c.category))];
   setItemCat(cats);
  };
  getData();
 }, []);
 
 const handleChange = (event) => {
  setSelectValue(event.target.value);
 };
 
 React.useEffect(() => {
  console.log(selectValue);
 }, [selectValue]);


 return (
  <FormControl size="small" sx={{ minWidth: 180 }}>
   <InputLabel id="demo-simple-select-label">All Categories</InputLabel>
   <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selectValue}
    label="Categories"
    onChange={handleChange}
   >
    <MenuItem value={""}>All Categories</MenuItem>
    {itemCat.map((c) => (
     <MenuItem key={c} value={c}>
      {c}
     </MenuItem>
    ))}
   </Select>
  </FormControl>
 );
}
