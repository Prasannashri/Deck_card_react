import React , { Component } from 'react';
import axios from "axios"
import Card from './Card';
import './Deck.css'
const BASE_URL = "https://deckofcardsapi.com/api/deck";
class Deck extends Component {
    constructor(props){
        super(props);
        this.state = {
            deck :null,
            drawn : []
        }
        this.getCard = this.getCard.bind(this)
    }
    async componentDidMount(){
        let newCard = await axios.get(`${BASE_URL}/new/shuffle`);
        this.setState ( { 
            deck : newCard.data
        })
    }
    async getCard(){
        let id = this.state.deck.deck_id;
         try {
            let cardFetchurl = `${BASE_URL}/${id}/draw/`;
            let res = await axios.get(cardFetchurl);
            if(res.data.success === 0){
                throw new Error('No Cards remaining!!')
            }
            let card = res.data.cards[0];
            this.setState ( st => ({
                drawn : [
                    ...st.drawn,
                    {
                        id: card.code,
                        image : card.image,
                        name : `${card.value} of ${card.suit}`
                    }
                ]
            }))
         } catch(err){
             alert( 'Something Went Wrong!')
         }
    }
    render(){
        const cards = this.state.drawn.map(card => {
            return <Card key = { card.id }image={card.image } name={ card.name} />
        })
        return (
            <div className = "Deck">
                <h1 className="Deck-title">Card Deck!!</h1>
                <button className= "Deck-btn"onClick = {this.getCard}>Get Card!!</button>
                <div className="Deckcardarea">{cards}</div>
            </div>
        )
    }
}
export default Deck;