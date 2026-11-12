"use client";

import Image from "next/image";
import { ExternalLink, Heart, Pin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackAnalyticsEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { robobroCampaign, robobroCopy } from "../../shared/robobro";

export function RoboBroCampaignCard({
  locale,
  placement,
}: {
  locale: Locale;
  placement: "home" | "feed";
}) {
  if (!robobroCampaign.enabled) return null;

  const labels = robobroCopy[locale];
  const isPost = placement === "feed";

  function trackDonationClick() {
    void trackAnalyticsEvent({
      event_type: "contact_click",
      contact_type: "link",
      metadata: {
        campaign: robobroCampaign.id,
        action: "donate",
        surface: `${placement}_campaign`,
        destination: robobroCampaign.url,
      },
    });
  }

  return (
    <article
      aria-labelledby={`robobro-${placement}-title`}
      className="overflow-hidden rounded-xl border border-amber-200 bg-card text-card-foreground shadow-sm dark:border-amber-800/60"
      id={`robobro-${placement}`}
    >
      {isPost ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border/60 px-5 py-3 text-xs font-bold text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 text-foreground">
            <Pin aria-hidden="true" className="h-3.5 w-3.5" />
            {labels.pinned}
          </span>
          <span>Kolo · {labels.badge}</span>
        </div>
      ) : null}
      <div className="grid sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="relative min-h-44 bg-[#F3F1E9] sm:min-h-64">
          <Image
            alt={labels.imageAlt}
            className="object-contain p-5"
            fill
            sizes="(min-width: 1280px) 480px, (min-width: 640px) 40vw, 100vw"
            src="/robobro.png"
          />
        </div>
        <div className="flex min-w-0 flex-col items-start p-5 md:p-7">
          {!isPost ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              <Heart aria-hidden="true" className="h-3.5 w-3.5" />
              {labels.badge}
            </span>
          ) : null}
          <h2
            className={cn("text-2xl font-black tracking-normal md:text-3xl", !isPost && "mt-3")}
            id={`robobro-${placement}-title`}
          >
            {labels.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
            {isPost ? labels.post : labels.summary}
          </p>
          <Button asChild className="mt-5 w-full sm:w-auto" size="lg">
            <a
              aria-label={labels.donateLabel}
              href={robobroCampaign.url}
              onClick={trackDonationClick}
              rel="noopener noreferrer"
              target="_blank"
            >
              {labels.donate}
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </a>
          </Button>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            {labels.destination}
          </p>
        </div>
      </div>
    </article>
  );
}
