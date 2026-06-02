"use client";

import { useEffect } from "react";
import { initJobbitAnalytics, type AnalyticsOptions } from "../browser/analytics";
import { mountJobbitBadge, shouldShowJobbitBadge, type BadgeOptions } from "../browser/badge";

export function JobbitAnalytics(props: AnalyticsOptions): null {
  useEffect(() => {
    initJobbitAnalytics(props);
  }, [props.endpoint, props.siteId, props.appId, props.respectDnt]);
  return null;
}

export function JobbitBadge(props: BadgeOptions): null {
  useEffect(() => {
    mountJobbitBadge(props);
  }, [props.enabled, props.tier, props.appUrl, props.expiresAt, props.variant, props.mount]);
  return null;
}

export { initJobbitAnalytics, mountJobbitBadge, shouldShowJobbitBadge };
export type { AnalyticsOptions, BadgeOptions };
