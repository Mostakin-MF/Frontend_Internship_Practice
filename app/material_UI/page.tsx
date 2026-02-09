"use client";

import Button from "@mui/material/Button";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";

export default function Material_Ui_Check() {
  return (
    <div className="p-10">
      <Button variant="text" startIcon={<ShoppingCartRounded />}>
        Add item
      </Button>

      <Button variant="contained" startIcon={<ShoppingCartRounded />}>
        Add item
      </Button>

      <Button variant="outlined" startIcon={<ShoppingCartRounded />}>
        Add item
      </Button>
    </div>
  );
}