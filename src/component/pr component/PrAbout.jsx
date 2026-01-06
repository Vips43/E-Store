import { Box, Card, CardMedia, Divider, Typography } from "@mui/material";

function PrAbout({ item }) {
 return (
  <Card sx={{ p: 3, maxWidth: 480, margin:'0 auto' }}>
   {/* Header */}
   <Typography variant="h6" fontWeight="bold" gutterBottom>
    Product Information
   </Typography>

   <Divider sx={{ mb: 2 }} />

   {/* Key-Value Rows */}
   <Box sx={{ display: "grid", rowGap: 1.5 }}>
    <InfoRow label="Product ID" value={item.id} />
    <InfoRow label="Weight" value={`${item.weight} g`} />
   </Box>

   {/* Meta Section */}
   <Box sx={{ mt: 3 }}>
    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
     Metadata
    </Typography>

    <Divider sx={{ mb: 2 }} />

    <Box sx={{ display: "grid", rowGap: 1.5 }}>
     <InfoRow label="Barcode" value={item.meta.barcode} />

     {/* QR Code */}
     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography variant="body2" color="text.secondary">
       QR Code
      </Typography>
      <CardMedia
       component="img"
       image={item.meta.qrCode}
       alt="QR Code"
       sx={{
        width: 90,
        height: 90,
        borderRadius: 1,
        border: "1px solid #eee",
       }}
      />
     </Box>

     <InfoRow label="Created At" value={formatDate(item.meta.createdAt)} />

     <InfoRow label="Updated At" value={formatDate(item.meta.updatedAt)} />
    </Box>
   </Box>
  </Card>
 );
}

/* 🔹 Reusable Row Component */
function InfoRow({ label, value }) {
 return (
  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
   <Typography variant="body2" color="text.secondary">
    {label}
   </Typography>
   <Typography variant="body2" fontWeight={500}>
    {value}
   </Typography>
  </Box>
 );
}

/* 🔹 Date Formatter */
function formatDate(date) {
 return new Date(date).toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
 });
}

export default PrAbout;
