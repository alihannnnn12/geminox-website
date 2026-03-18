import { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children
}: SectionShellProps) {
  return (
    <section className="section-wrap" id={id}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className="section-title">{title}</h2>
          {description ? <p className="section-copy mt-4">{description}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
