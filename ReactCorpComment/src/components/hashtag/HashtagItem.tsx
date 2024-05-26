type HashtagProps = {
  hashtag: string;
  onClick: (hashtag: string) => void;
};

export default function HashtagItem({ hashtag, onClick }: HashtagProps) {
  return (
    <li>
      <button onClick={() => onClick(hashtag)}>#{hashtag}</button>
    </li>
  );
}
