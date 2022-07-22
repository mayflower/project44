import { Grid } from "@mui/material";
import React from "react";
import ListItem from "./ListItem";

export default function List() {
  return (
    <Grid container spacing={2}>
      <ListItem />
    </Grid>
  );
}
