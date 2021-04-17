# ecliptic
~Javascript~ Adaptation of AEG's card game, Love Letter

TODO: 
- [x] Rename the images.  C'mon, Harrison.
- [x] (In progress) Scrap out the JS, build it again in Golang.
- [ ] Actually build it with multiplayer


WE DOING IRIS AGAIN BAYBEEEEEEEEEE

Tools
- Iris (for frontend)
- Redis (for caching game data in progress)
- docker (for composing the redis and the game logic)? 


Design:

- At beginning, create or join session.
- Number of players is an session is determined by number present, not set a priori
- Target Score is set a priori, however.

Each Session has:
- ID
- Target Score
- Players

Round has:
- Deck
- Discard Pile

Player has:
- ID
- Hand
- Score
- Affectable?
- Out?

Card has:
- Effect
- Value