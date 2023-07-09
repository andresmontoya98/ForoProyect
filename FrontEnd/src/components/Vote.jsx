/* eslint-disable react/prop-types */
import { AuthContext } from '../context/AuthContext';
import { useState, useContext } from 'react';
import { Box, Rating, Snackbar, Alert } from '@mui/material';
import { addVoteService, checkVoted } from '../services';

export const Vote = ({ linkId, initialValue }) => {
    const { token } = useContext(AuthContext);
    const [value, setValue] = useState(initialValue);
    const [canVote, setCanVote] = useState(true);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);


    const handleRatingChange = async (event, newValue) => {
        setValue(newValue);
        setOpen(true);

        try {
            const result = await checkVoted(linkId, token);
            setCanVote(result);

            if (!result) {
                return;
            } else {
                await addVoteService(linkId, token, newValue);
            }

        } catch (error) {
            setError(error.message);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Box>
                <Rating name={`rating-${linkId}`} value={value} onChange={handleRatingChange} disabled={!canVote} />
            </Box>

            {
                !canVote ? (
                    <Box>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                                No puedes votar sobre esta publicación!
                                <p>{error}</p>
                            </Alert>
                        </Snackbar>

                    </Box>

                ) : (
                    <Box>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                Voto realizado exitosamente!
                            </Alert>
                        </Snackbar>
                    </Box>
                )
            }
        </>

    );
};