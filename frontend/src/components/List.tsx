import { Grid, Typography } from "@mui/material";
import React from "react";
import ListItem from "./ListItem";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import If from "./If";

const bets2: Bet[] = [
  {
    betId: "1",
    title: "My Bet",
    description: "Rainy tomorrow",
    criteria: ["Rainy Tomorrow"],
    expirationTime: "2022-05-23",
    creator: {
      userId: 10,
      nickname: "Xedon",
      mail: "emanuel.vollmer@mayflower.de",
    },
    minimumWager: 100,
    isWagerSelectable: false,
    isPublic: true,
    competitors: [
      {
        userId: 13,
        nickname: "Thomas",
        mail: "thomas.schindler@mayflower.de",
        wager: 100,
      },
      {
        userId: 10,
        nickname: "Xedon",
        mail: "emanuel.vollmer@mayflower.de",
        wager: 100,
      },
      {
        userId: 22,
        nickname: "Mare",
        mail: "maria.walzl@mayflower.de",
        wager: 100,
      },
    ],
  },
  {
    betId: "2",
    title: "My Bet 2",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.",
    criteria: ["Rainy Tomorrow", "sunny", "snowy"],
    expirationTime: "2022-10-23",
    creator: {
      userId: 22,
      nickname: "Mare",
      mail: "maria.walzl@mayflower.de",
    },
    minimumWager: 200,
    isWagerSelectable: true,
    isPublic: true,
    competitors: [
      {
        userId: 13,
        nickname: "Thomas",
        mail: "thomas.schindler@mayflower.de",
        wager: 200,
      },
      {
        userId: 10,
        nickname: "Xedon",
        mail: "emanuel.vollmer@mayflower.de",
        wager: 300,
      },
    ],
  },
  {
    betId: "3",
    title: "My Bet 3",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.",
    criteria: ["Rainy Tomorrow", "sunny", "snowy", "others"],
    expirationTime: "2022-08-15",
    creator: {
      userId: 10,
      nickname: "Xedon",
      mail: "emanuel.vollmer@mayflower.de",
    },
    minimumWager: 40,
    isWagerSelectable: false,
    isPublic: true,
    competitors: [
      {
        userId: 13,
        nickname: "Thomas",
        mail: "thomas.schindler@mayflower.de",
        wager: 40,
      },
      {
        userId: 10,
        nickname: "Xedon",
        mail: "emanuel.vollmer@mayflower.de",
        wager: 40,
      },
    ],
  },
];

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
    const response = await axios.get("/test/bet");
    return response.data;
  });

  return (
    <>
      <Typography variant={"h4"} fontWeight={"600"} sx={{ mb: "20px" }}>
        Vorhandene Wetten
      </Typography>
      <If condition={!isLoading && bets.length !== 0 && bets}>
        <Grid container spacing={2}>
          {bets.map((bet: any) => (
            <ListItem bet={bet} key={bet.betId} />
          ))}
        </Grid>
      </If>
      <If condition={isLoading || bets.length === 0}>
        <Typography variant={"h4"} fontWeight={"600"} sx={{ mb: "20px" }}>
          Laden...
        </Typography>
      </If>
    </>
  );
}
