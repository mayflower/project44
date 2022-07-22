import React from "react";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { AccessAlarm, AccessTime, Euro, Groups } from "@mui/icons-material";
import { Bet } from "./List";
import moment from "moment";

interface ListItemProps {
  bet: Bet;
}

export default function ListItem({ bet }: ListItemProps) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardHeader
          title={bet.title}
          avatar={<AccessAlarm />}
          titleTypographyProps={{ variant: "h5" }}
        />
        <CardContent>
          <Grid container justifyContent={"space-between"}>
            <Grid item sx={{ display: "flex" }}>
              <AccessTime />
              <Typography sx={{ marginLeft: "10px" }}>
                {moment(bet.expirationTime, "DD").fromNow()}
              </Typography>
            </Grid>
            <Grid item sx={{ display: "flex" }}>
              <Euro />
              <Typography sx={{ marginLeft: "10px" }}>
                {bet.minimumWager}
              </Typography>
            </Grid>
            <Grid item sx={{ display: "flex" }}>
              <Groups />
              <Typography sx={{ marginLeft: "10px" }}>
                {bet.competitors.length}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
