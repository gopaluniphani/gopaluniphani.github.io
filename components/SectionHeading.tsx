type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  inverted?: boolean;
};

export function SectionHeading({ id, eyebrow, title, description, inverted = false }: SectionHeadingProps) {
  return (
    <header className={`section-heading${inverted ? " section-heading--inverted" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <div className="section-heading__body">
        <h2 id={id}>{title}</h2>
        {description ? <p className="section-heading__description">{description}</p> : null}
      </div>
    </header>
  );
}
