import {
    Button,
    Card,
    CardActions, CardContent,
    CardHeader, Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Grid, Paper,
    Radio,
    TextField,
    Typography
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import EuroIcon from "@mui/icons-material/Euro";
import ScheduleIcon from "@mui/icons-material/Schedule";
import React from "react";
import {styled} from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface Props {
    betId: string;
    open: boolean;
    handleClose: () => void;
}

const dummybet = {
    betId: "1",
    title: 'FC Bayern gegen Kickers',
    stickerUrl: 'https://twemoji.maxcdn.com/2/svg/1f47e.svg',
    description: 'Lorem Ipsum Lalala',
    creator: 'Hans Dampf',
    minStake: 5.0,
    isStakeVariable: true,
    options: [
        {
            id: 0,
            name: 'FC Bayern',
            amountBet: 99,
            quote: 2.5
        },
        {
            id: 1,
            name: 'Kickers',
            amountBet: 1,
            quote: 1.5
        }
    ],
    endTimestamp: new Date(Date.parse('Fri Jul 23 2022 10:37:23 GMT+0200')),
};

export default function DetailView (props: Props) {
    const [selectedOptionId, setSelectedOptionId] = React.useState(-1);
    const [bet, setBet] = React.useState(dummybet);

    const handleOptionClick = (event: any) => {
        setSelectedOptionId(parseInt(event.target.id))
    }

    const calculateTime = () => {
        return bet.endTimestamp.getTime().toString();
    }
    return (
        <Dialog
            open={props.open}
            onClose={() => props.handleClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <DialogTitle>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <img src={bet.stickerUrl} alt="lustiger Sticker" style={{height: "1.5rem"}} />{bet.title}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {bet.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <GroupIcon /> {bet.creator}</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item><EuroIcon /> {bet.minStake}</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item><ScheduleIcon />{calculateTime()}</Item>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="stake" label="Wetteinsatz" value={bet.minStake} required/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="email" label="E-Mail-Adresse" value="" required/>
                    </Grid>
                    {bet.options.map(opt => {
                        return (<Grid item xs={4}>
                            <Card raised style={{backgroundColor: opt.id === selectedOptionId ? "#ffadaa" : "white"}}>
                                <CardActions>
                                    <Radio id={opt.id.toString()} checked={opt.id === selectedOptionId} onClick={handleOptionClick}></Radio>
                                </CardActions>
                                <CardHeader sx={{color: "black"}} title={opt.name} />
                                <CardContent>
                                    Anzahl Wetten: {opt.amountBet}<br />
                                    Quote: {opt.quote}
                                </CardContent>
                            </Card>
                        </Grid>)
                    })}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="contained">Wette abgeben</Button>
            </DialogActions>
        </Dialog>
    )
}