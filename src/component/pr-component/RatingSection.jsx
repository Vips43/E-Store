import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Card, Typography, Divider } from "@mui/material";

const labels = {
 0.5: "Useless",
 1: "Useless+",
 1.5: "Poor",
 2: "Poor+",
 2.5: "Ok",
 3: "Ok+",
 3.5: "Good",
 4: "Good+",
 4.5: "Excellent",
 5: "Excellent+",
};

export default function RatingSection({ item }) {

 const value = Math.round(item.rating * 2) / 2;

 return (
  <Box sx={{ maxWidth: 600, margin: "0 auto" }}>
   {/* HEADER */}
   <Box sx={{ mb: 2 }}>
    <Typography variant="h6" fontWeight="bold">
     Ratings & Reviews
    </Typography>

    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
     <Rating
      value={value}
      readOnly
      precision={0.5}
      emptyIcon={<StarIcon style={{ opacity: 0.4 }} fontSize="inherit" />}
     />
     <Typography variant="body2" color="text.secondary">
      {labels[value]}
     </Typography>
    </Box>
   </Box>

   <Divider sx={{ mb: 2 }} />

   {/* REVIEWS */}
   <Box sx={{ display: "grid", gap: 2 }}>
    {item.reviews.map((r, index) => (
     <Card key={index} sx={{ p: 2 }}>
      <Rating value={r.rating} readOnly size="small" />

      <Typography variant="body2" sx={{ mt: 1 }}>
       {r.comment}
      </Typography>

      <Typography
       variant="caption"
       color="text.secondary"
       sx={{ display: "block", mt: 1 }}
      >
       {r.reviewerName} • {r.reviewerEmail}
      </Typography>
      <Box>
       <Typography variant="body2" color="text.secondary">
        {new Date(r.date).toLocaleDateString("en-IN", {
         day: "2-digit",
         month: "short",
         year: "numeric",
        })}
       </Typography>
      </Box>
     </Card>
    ))}
   </Box>
  </Box>
 );
}
