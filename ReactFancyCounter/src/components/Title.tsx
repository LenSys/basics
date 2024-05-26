type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => {
  return <h1 className="title">{title}</h1>;
};

export default Title;
