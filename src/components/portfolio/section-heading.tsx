interface SectionHeadingProps {
  id: string;
  index: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  id,
  index,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <span className="section-heading__index">{index}</span>
      <div>
        <h2 id={id}>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </header>
  );
}
