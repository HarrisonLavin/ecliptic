# ecliptic
~Javascript~ Adaptation of AEG's card game, Love Letter

TODO: 
- [x]Rename the images.  C'mon, Harrison.
- []Scrap out the JS, build it again in Golang. 
- []Actually build it with multiplayer


Design:

Each Session has:
- UUID
- Target Score
- Players

Round has:
- Deck
- Discard Pile

Player has:
- Hand
- Score
- Affectable?
- Out?

Card has:
- Effect
- Value