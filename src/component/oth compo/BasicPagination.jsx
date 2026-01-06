import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useMyStore from "../../store/store";

export default function BasicPagination() {
  const total = useMyStore((s) => s.totalProducts);
  const limit = useMyStore((s) => s.limit);
  const page = useMyStore((s) => s.page);
  const isLoading = useMyStore((s) => s.isLoading);
  const fetchData = useMyStore((s) => s.fetchData);

  const pageCount = Math.ceil(total / limit);

  if (pageCount <= 1) return null;

  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        page={page}
        disabled={isLoading}
        onChange={(_, value) => fetchData(value, limit)}
        color="primary"
      />
    </Stack>
  );
}
