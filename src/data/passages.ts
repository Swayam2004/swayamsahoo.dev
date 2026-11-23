import type { Skin } from './skins';

export interface Passage {
  id: string;
  /** where the text comes from, shown under the test */
  source: string;
  /** skin-flavored passages only appear in that skin; the rest appear everywhere */
  skin?: Skin;
  text: string;
}

/**
 * Plain ASCII only (straight quotes, hyphens) so every keyboard can type them.
 * Each passage is 55+ words, at least 30 seconds at 104 wpm.
 * Quotes are public domain (published before 1929).
 */
export const PASSAGES: readonly Passage[] = [
  // ---- public-domain quotes ----
  {
    id: 'walden',
    source: 'Henry David Thoreau, Walden (1854)',
    text: 'I went to the woods because I wished to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived. I did not wish to live what was not life, living is so dear; nor did I wish to practise resignation, unless it was quite necessary.',
  },
  {
    id: 'two-cities',
    source: 'Charles Dickens, A Tale of Two Cities (1859)',
    text: 'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us.',
  },
  {
    id: 'pride',
    source: 'Jane Austen, Pride and Prejudice (1813)',
    text: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.',
  },
  {
    id: 'moby',
    source: 'Herman Melville, Moby-Dick (1851)',
    text: 'Call me Ishmael. Some years ago, never mind how long precisely, having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth, I account it high time to get to sea as soon as I can.',
  },

  // ---- games he has played ----
  {
    id: 'waterdeep',
    source: 'On Lords of Waterdeep',
    text: 'Every round of Lords of Waterdeep starts the same way: you look at the board, count your agents, and pretend you are not already planning to steal the one building everyone else needs. Quests pay well, but only if the right adventurers walk through your door. Host the game a few times and you learn the real secret, which is that the rules take five minutes and the arguing takes an hour.',
  },
  {
    id: 'catan',
    source: 'On Catan',
    text: 'Nobody has ever been happy with the robber. You place your first two settlements with the confidence of a city planner, and three turns later you are offering two sheep and a sincere apology for one piece of brick. Catan is less a game about building roads than a game about negotiation, patience, and the quiet fury of watching the dice roll an eight for the fifth time in a row.',
  },
  {
    id: 'heat',
    source: 'On Heat: Pedal to the Metal',
    text: 'The corner is coming up fast and the speed limit is three. You have a hand full of fours and a dashboard already hot from the last bend. Heat is a racing game where the brakes matter more than the engine, where a careful driver who manages the cards beats a reckless one who only counts spaces. Add the weather module and the track becomes a different machine every lap.',
  },
  {
    id: 'istanbul',
    source: 'On Istanbul',
    text: 'In Istanbul you push a merchant and a stack of assistants through a crowded bazaar, dropping helpers at each stall so you can come back later and work faster. Plan the route badly and you waste a whole turn walking. Plan it well and the rubies start arriving one after another. Add the coffee expansion and every shortcut suddenly smells a little stronger and costs a little more.',
  },
  {
    id: 'root-game',
    source: 'On Root',
    text: 'Four factions share one forest and none of them want the same thing. The cats build sawmills and workshops in neat rows, the birds follow a decree they cannot break, and the woodland creatures wait quietly, spreading sympathy from clearing to clearing until the whole map turns against the empire overnight. My first win came that way: slowly, then all at once, one revolt at a time.',
  },
  {
    id: 'brass',
    source: 'On Brass: Birmingham',
    text: 'Brass is a game about canals turning into railways and coal turning into money, and about the painful moment you realise your rival built the brewery you were counting on. Every loan feels clever until the interest arrives. By the end of the second era the board looks like a map of an industrial city, and every link on it tells you exactly who planned ahead and who did not.',
  },
  {
    id: 'splendor',
    source: 'On Splendor',
    text: 'Splendor looks gentle: a few chips, a few cards, a handful of nobles waiting at the top of the table. Then you notice the player beside you has been quietly collecting green for six turns and is one card away from a discount on everything. It is a short game about engines, timing and greed, and it rewards whoever stops admiring the gems and starts counting them first.',
  },
  {
    id: 'chess',
    source: 'On chess',
    text: 'A rapid game of chess gives you ten minutes to think and about thirty seconds of genuine calm. You play the opening from memory, reach a middlegame you have never seen, and spend the rest of the clock trying not to hang a knight. The board does not care how well you played yesterday. It only shows the position in front of you and asks, again, what you are going to do next.',
  },

  // ---- frontier ----
  {
    id: 'frontier-1',
    source: 'From the frontier desk',
    skin: 'frontier',
    text: 'The stagecoach rolled into town an hour after sundown, dust on every wheel and a sack of mail strapped to the roof. The editor lit the lamp, rolled a fresh sheet into the typewriter and began to set the morning paper. There was news of a bank robbery two valleys over, a dispute about cattle, and a notice that the telegraph line to the coast was finally working again.',
  },
  {
    id: 'frontier-2',
    source: 'From the frontier desk',
    skin: 'frontier',
    text: 'Out here a man is judged by three things: how he treats his horse, whether he pays his debts, and how fast he can draw when the saloon goes quiet. The editor of this paper has no horse and very few debts, so he settles for the third thing in his own way. He draws words. Beat his record on the typewriter and your name goes in the next edition.',
  },
  {
    id: 'frontier-3',
    source: 'From the frontier desk',
    skin: 'frontier',
    text: 'The camp settled around the fire as the last light left the hills. Someone tuned an old guitar, someone else complained about the beans, and the wind carried the smell of rain from somewhere far to the west. Tomorrow there would be miles to ride and wire to string, but tonight there was only coffee, smoke, and a sky so full of stars it seemed impossible to count them all.',
  },

  // ---- woodland ----
  {
    id: 'woodland-1',
    source: 'Pinned to a woodland tree',
    skin: 'woodland',
    text: 'To every mouse, fox and rabbit in the clearing: the cats have built another sawmill by the river, and the birds are marching again under their latest decree. We do not need an army to stop them, only neighbours who are willing to help. Leave a sympathy token at your door, share what you can spare, and when the signal comes, we rise together and take the forest back.',
  },
  {
    id: 'woodland-2',
    source: 'Pinned to a woodland tree',
    skin: 'woodland',
    text: 'The officers met in the hollow beneath the old oak, lanterns shaded so the patrols would not see. A rabbit drew the map in the dirt with a stick. Three clearings already sympathised, one more and they could found a base by the fox meadow. Nobody spoke loudly. Revolutions in the woods are not made with speeches; they are made with patience, supplies and a well-timed surprise.',
  },
  {
    id: 'woodland-3',
    source: 'Pinned to a woodland tree',
    skin: 'woodland',
    text: 'Morning fog sat low over the clearing and the grass was still heavy with dew. Somewhere a woodpecker started work on a dead branch, steady as a clock. The forest woke slowly: a squirrel testing the air, a family of mice carrying seeds along a path older than any map, and a single firefly, late to bed, blinking twice before it vanished into the ferns for the day.',
  },

  // ---- marquise ----
  {
    id: 'marquise-1',
    source: 'Posted at the Marquise keep',
    skin: 'marquise',
    text: 'By order of the Marquise: all workers will report to the sawmills at dawn. Wood is to be carried along the roads, not through the forest, and every plank is to be counted twice. Workshops will run until the lamps are lit. Recruiters are reminded that overwork is not a punishment but a privilege, and that the keep remembers every cat who helped build it and every one who did not.',
  },
  {
    id: 'marquise-2',
    source: 'Posted at the Marquise keep',
    skin: 'marquise',
    text: 'The foreman counted the stacks of timber and frowned. Two sawmills in the east, one workshop by the lake, and a recruiter who kept falling asleep in the sun. The birds were circling again and the rabbits had been seen whispering near the roads. Still, the empire grew a little every day, one building at a time, and by autumn the whole valley would be paved and orderly.',
  },
  {
    id: 'marquise-3',
    source: 'Posted at the Marquise keep',
    skin: 'marquise',
    text: 'A good cat keeps three things sharp: claws, accounts and attention. The first protects the keep, the second protects the treasury, and the third catches the mouse who is quietly carrying a sympathy token past the guards. Workshops do not build themselves and roads do not stay clear on their own. Every victory point in this valley was earned by somebody working late, so type like you mean it.',
  },
];
