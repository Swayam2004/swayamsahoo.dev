# swayamsahoo.dev

Personal portfolio of Swayam Sahoo. Recruiter-first, with a game layer for peers and devs.

## Language

**Skin**:
A complete visual theme for the whole site, inspired by a game Swayam is playing or has played. Changes look and, sparingly, wording; never the information layout.
_Avoid_: theme, mode

**Edition**:
The day or night variant of a skin (light/dark). "Night edition" = dark.
_Avoid_: dark mode (in copy)

**Dispatch**:
One project entry as shown on the site.
_Avoid_: card, post

**Telegram**:
One achievement a visitor earns by exploring.
_Avoid_: badge, trophy

**Play log**:
The dated record of board-game sessions, each played or hosted. Source of truth for the shelf.

**Shelf**:
The page presenting the board games derived from the play log.
_Avoid_: collection (Swayam doesn't own all of them)

**Extras**:
Very casual games in the play log (UNO variants, Game of Life, 5 Alive). Shown, but not counted in totals.

**Back room**:
The hidden command shell, unlocked by progress or the `~` key.
_Avoid_: terminal, console (in copy)

## Relationships

- A **Skin** has one or two **Editions**
- A **Telegram** may unlock the **Back room** or a bonus **Skin**; nothing a recruiter needs is ever locked
- The **Shelf** is computed from the **Play log**; **Extras** appear on it but not in its counts

## Flagged ambiguities

- Recruiter-facing labels must read plainly; flavored words (Dispatch, Telegram) appear only alongside a plain label. Exact pairing is an open ticket.
