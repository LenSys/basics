import HashtagItem from "./HashtagItem";

type HashtagListProps = {
  hashtags: string[];
  onSelectHashtag: (hashtag: string) => void;
};

export default function HashtagList({
  hashtags,
  onSelectHashtag,
}: HashtagListProps) {
  return (
    <ul className="hashtags">
      {hashtags.map((hashtag) => (
        <HashtagItem
          key={hashtag}
          hashtag={hashtag}
          onClick={onSelectHashtag}
        />
      ))}
    </ul>
  );
}
