import { ContactForm } from "@/components/contact-form";
import { ButtonLink } from "@/components/button-link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { siteConfig } from "@/data/site";

export default function ContactPage() {
  return (
    <>
      <PageHero
        description="A club-friendly contact page with the booking email clearly visible, plus a placeholder form that works in local preview."
        eyebrow="Contact / Bookings"
        title="A direct line for clubs, promoters, labels, and collaborators."
      >
        <div className="panel-glow p-6">
          <p className="eyebrow mb-2">Booking Email</p>
          <a className="text-xl text-white" href={`mailto:${siteConfig.bookingEmail}`}>
            {siteConfig.bookingEmail}
          </a>
        </div>
      </PageHero>

      <SectionShell
        description={siteConfig.contact.responseNote}
        eyebrow="Booking Info"
        title="Reach out with the room, city, date, and timing details."
      >
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)]">
            <div className="grid gap-4">
              <div className="panel-glow p-5">
                <p className="eyebrow mb-2">Email</p>
                <a className="text-2xl text-white" href={`mailto:${siteConfig.bookingEmail}`}>
                  {siteConfig.bookingEmail}
                </a>
              </div>
              <div className="panel-glow p-5">
                <p className="eyebrow mb-2">Location</p>
                <p className="text-2xl text-white">{siteConfig.location}</p>
              </div>
              <div className="panel-glow p-5">
                <p className="eyebrow mb-2">Best For</p>
                <p className="text-base leading-8 text-white/68">{siteConfig.contact.promoterCopy}</p>
              </div>
              <div className="panel-glow p-5">
                <p className="eyebrow mb-2">Prefer Email?</p>
                <ButtonLink href={`mailto:${siteConfig.bookingEmail}`} variant="secondary">
                  Open Email
                </ButtonLink>
              </div>
            </div>
            <ContactForm />
          </div>
        </Reveal>
      </SectionShell>
    </>
  );
}
