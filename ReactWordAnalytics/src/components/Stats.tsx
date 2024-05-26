import {
  FACEBOOK_MAX_CHARACTERS,
  INSTAGRAM_MAX_CHARACTERS,
} from "../lib/constants";

type StatsProps = {
  text: string;
};

const Stats = ({ text }: StatsProps) => {
  const numberOfCharacters = text.length;
  let numberOfWords = text.split(" ").length;
  if (text.length === 0) {
    numberOfWords = 0;
  }

  // alternative way to calculate number of words
  // const numberOfWords = text.split(/\s/).filter((word) => word !== "").length;

  return (
    <section className="stats">
      <Stat number={numberOfWords} heading="Words" />
      <Stat number={numberOfCharacters} heading="Characters" />
      <Stat
        number={INSTAGRAM_MAX_CHARACTERS - numberOfCharacters}
        heading="Instagram"
      />
      <Stat
        number={FACEBOOK_MAX_CHARACTERS - numberOfCharacters}
        heading="Facebook"
      />
    </section>
  );
};

type StatProps = {
  number: number;
  heading: string;
};

const Stat = ({ number, heading }: StatProps) => {
  return (
    <section className="stat">
      <span
        className={`stat__number ${number < 0 ? "stat__number--limit" : ""}`}
      >
        {number}
      </span>
      <h2 className="second-heading">{heading}</h2>
    </section>
  );
};

export default Stats;
