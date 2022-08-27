import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';

const newDeckUrl =
    'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

export const Deck = () => {
    const [deck, setDeck] = useState(null);
    const [cardSrc, setCardSrc] = useState('');

    let deckOfCards;
    useEffect(() => {
        const createDeck = async () => {
            const res = await axios.get(newDeckUrl);
            setDeck(res.data);
        };
        createDeck();
        return () => console.log('Created Deck');
    }, []);

    let cardsRemaining;
    const drawCard = async () => {
        const card = await axios.get(
            `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
        );
        cardsRemaining = card.data.remaining;

        if (cardsRemaining === 0) alert('Error: No cards remaining!');

        setCardSrc(card.data.cards[0].image);
    };

    return (
        <div>
            <h1>Hello World</h1>
            <button onClick={drawCard}>Draw Card</button>
            <br />
            <img src={cardSrc} />
        </div>
    );
};
