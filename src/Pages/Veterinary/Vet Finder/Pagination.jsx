import React from "react";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const Paginate = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={(e, page) => paginate(page)}
        color={"info"}
      />
    </Box>
  );
};

export default Paginate;
