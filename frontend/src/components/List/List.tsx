import { Grid, Typography } from "@mui/material";
import React from "react";
import ListItem from "./ListItem";

import { useQuery } from "@tanstack/react-query";
import If from "../util/If";
import { axiosInstance } from "../../App";

export interface Bet {
  betId: string;
  title: string;
  description: string;
  criteria: string[];
  expirationTime: string;
  creator: {
    userId: number;
    nickname: string;
    mail: string;
  };
  minimumWager: number;
  isWagerSelectable: boolean;
  isPublic: boolean;
  competitors: {
    userId: number;
    nickname: string;
    mail: string;
    wager: number;
  }[];
}

export default function List() {
  const { data: bets, isLoading } = useQuery(["bets"], async () => {
    const response = await axiosInstance.get<Bet[]>("/bet");
    return response.data;
  });

  return (
    <>
      <Typography variant={"h4"} fontWeight={"600"} sx={{ mb: "20px" }}>
        Vorhandene Wetten
      </Typography>
      <If condition={!!bets}>
        <Grid container spacing={2}>
          {bets?.map((bet) => (
            <ListItem bet={bet} key={bet.betId} />
          ))}
        </Grid>
      </If>
      <If condition={isLoading}>
        <Typography variant={"h4"} fontWeight={"600"} sx={{ mb: "20px" }}>
          Laden...
        </Typography>
      </If>
    </>
  );
}
