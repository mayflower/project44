import React from "react";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { AccessAlarm, AccessTime, Euro, Groups } from "@mui/icons-material";

export default function ListItem() {
  const arrayOfObjects = [
    {
      text: "2 Tage",
      icon: <AccessTime />,
    },
    {
      text: "10",
      icon: <Euro />,
    },
    {
      text: "2",
      icon: <Groups />,
    },
  ];
  return (
    <Grid item lg={4}>
      <Card>
        <CardHeader title="Card Header" avatar={<AccessAlarm />} />
        <CardContent>
          <Grid container justifyContent={"space-between"}>
            {arrayOfObjects.map(({ text, icon }) => (
              <Grid item sx={{ display: "flex" }}>
                {icon}
                <Typography sx={{ marginLeft: "10px" }}>{text}</Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
