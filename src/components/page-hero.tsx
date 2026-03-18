import { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  children
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(35,139,255,0.18),_transparent_42%),linear-gradient(180deg,_rgba(4,8,15,0.4),_rgba(4,8,15,0.95))]" />
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-6 md:pb-20 lg:px-8">
        <p className="eyebrow">{eyebrow}</p>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.7fr)] lg:items-end">
          <div className="max-w-4xl">
            <h1 className="hero-title max-w-4xl text-balance">{title}</h1>
            <p className="section-copy mt-6 max-w-2xl text-lg">{description}</p>
          </div>
          {children ? <div>{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
