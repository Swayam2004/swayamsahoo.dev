# Box art for /shelf

Drop images here and the next build picks them up. Games without an image keep their generated cover.

- Cover: `<slug>.jpg` (or `.png`, `.webp`). A game with a cover and no spine image always sits face-out.
- Side: `<slug>-spine.jpg`. Used when the box stands as a spine or lies in a stack.
- Slug: the name from the play log in lowercase, with every run of other characters turned into `-`. `Heat: Pedal to the Metal` becomes `heat-pedal-to-the-metal`, `7 UP` becomes `7-up`.

The build resizes everything, so file size doesn't matter much. Prefer publisher press-kit images.
To force a box face-out without art, or to give its spine a colour, edit `src/data/games.ts`.
