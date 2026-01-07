import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { TabPanel } from "./TabPanel";
import Desc from "./Desc";
import RatingSection from "./RatingSection";
import PrAbout from "./PrAbout";

function LeftSection({ item }) {
 const [tab, setTab] = React.useState(0);

 return (
  <Box sx={{ maxWidth: "100%", mt: 4 }}>
   {/* Tabs header */}
   <Tabs
    value={tab}
    onChange={(_, newValue) => setTab(newValue)}
    textColor="primary"
    indicatorColor="primary"
    sx={{
     borderBottom: 1,
     borderColor: "divider",
    }}
   >
    <Tab label="Description" />
    <Tab label={`Reviews (${item.reviews?.length || 0})`} />
    <Tab label="Support" />
   </Tabs>

   {/* DESCRIPTION TAB */}
   <TabPanel value={tab} index={0}>
    <Typography variant="h6" fontWeight="bold" gutterBottom>
     Product Details : {item.title}
    </Typography>

    <Divider sx={{ mb: 2 }} />

    <Desc item={item} />  {/*Description*/}
   </TabPanel>

   {/* REVIEWS TAB */}
   <TabPanel value={tab} index={1}>
    <RatingSection item={item} />
   </TabPanel>

   {/* SUPPORT TAB */}
   <TabPanel value={tab} index={2}>
    <PrAbout item={item} />
   </TabPanel>
  </Box>
 );
}

export default LeftSection;
