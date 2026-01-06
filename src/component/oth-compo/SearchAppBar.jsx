import {
 Box,
 Toolbar,
 List,
 ListItemButton,
 ListItemText,
 Typography,
 Divider,
 Paper,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import BasicSelect from "./BasicSelect";
import useMyStore from "../../store/store";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* 🔹 Styled Components (unchanged) */
const SearchContainer = styled("div")(({ theme }) => ({
 position: "relative",
 display: "flex",
 alignItems: "center",
 width: 260,
 maxWidth: 420,
 borderRadius: 999,
 backgroundColor: alpha(theme.palette.common.white, 0.15),
 border: `1px solid ${alpha(theme.palette.common.white, 0.3)}`,
 transition: "all 0.3s ease",
 "&:hover": {
  backgroundColor: alpha(theme.palette.common.white, 0.25),
 },
 "&:focus-within": {
  width: 360,
  backgroundColor: theme.palette.common.white,
  borderColor: theme.palette.primary.main,
  boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.15)}`,
 },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
 padding: theme.spacing(0, 2),
 color: alpha(theme.palette.common.black, 0.6),
 display: "flex",
 alignItems: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
 flex: 1,
 color: theme.palette.text.primary,
 "& .MuiInputBase-input": {
  padding: theme.spacing(1.2, 1, 1.2, 0),
  fontSize: 14,
 },
}));

/* 🔹 Component */
export default function SearchAppBar() {
 const input = useMyStore((s) => s.input);
 const setInput = useMyStore((s) => s.setInput);
 const searchData = useMyStore((s) => s.searchData);
 const searchResults = useMyStore((s) => s.searchResults);
 const clearSearch = useMyStore((s) => s.clearSearch);

 const wrapperRef = useRef(null);
 const navigate = useNavigate();

 /* 🔹 Debounced Search */
 useEffect(() => {
  if (input.trim().length < 3) return;

  const timer = setTimeout(() => {
   searchData(input);
  }, 400);

  return () => clearTimeout(timer);
 }, [input, searchData]);

 /* 🔹 Close dropdown on outside click */
 useEffect(() => {
  const handleClick = (e) => {
   if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
    clearSearch();
   }
  };
  document.addEventListener("mousedown", handleClick);
  return () => document.removeEventListener("mousedown", handleClick);
 }, [clearSearch]);

 return (
  <Box sx={{ flexGrow: 1 }}>
   <Toolbar sx={{ gap: 2, minHeight: 64, justifyContent: "space-between" }}>
    {/* SEARCH */}
    <SearchContainer ref={wrapperRef}>
     <SearchIconWrapper>
      <SearchIcon />
     </SearchIconWrapper>

     <StyledInputBase
      placeholder="Search products…"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      inputProps={{ "aria-label": "search" }}
     />

     {/* 🔽 DROPDOWN */}
     {searchResults.length > 0 && (
      <Paper
       sx={{
        position: "absolute",
        top: "110%",
        left: 0,
        width: "100%",
        maxHeight: 300,
        overflowY: "auto",
        borderRadius: 2,
        boxShadow: 6,
        zIndex: 1500,
       }}
      >
       <List dense>
        {searchResults.slice(0, 6).map((item) => (
         <Box key={item.id}>
          <ListItemButton
           onClick={() => {
            navigate(`/product/${item.title}`);
            clearSearch();
           }}
          >
           <ListItemText
            primary={
             <Typography fontSize={14} fontWeight={500}>
              {item.title}
             </Typography>
            }
            secondary={
             <Typography variant="caption" color="text.secondary">
              ₹ {item.price} • {item.category}
             </Typography>
            }
           />
          </ListItemButton>
          <Divider />
         </Box>
        ))}
       </List>
      </Paper>
     )}
    </SearchContainer>

    {/* CATEGORY */}
    <BasicSelect />
   </Toolbar>
  </Box>
 );
}
