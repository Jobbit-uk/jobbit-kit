import { initJobbitAnalytics, type AnalyticsOptions } from "./analytics";
import { mountJobbitBadge, shouldShowJobbitBadge, type BadgeOptions } from "./badge";

export interface JobbitKitInitOptions {
  analytics?: AnalyticsOptions | false;
  badge?: BadgeOptions | false;
  autoPageview?: boolean;
}

export interface JobbitKitGlobalConfig extends JobbitKitInitOptions {
  autoInit?: boolean;
}

export function init(options: JobbitKitInitOptions = {}) {
  const analytics = options.analytics === false ? null : initJobbitAnalytics(options.analytics ?? {});
  const badge = options.badge === false ? null : mountJobbitBadge(options.badge ?? {});

  if (analytics && options.autoPageview !== false) {
    analytics.pageview();
  }

  return { analytics, badge };
}

export const JobbitKit = {
  init,
  initJobbitAnalytics,
  mountJobbitBadge,
  shouldShowJobbitBadge
};

declare global {
  interface Window {
    JobbitKit?: typeof JobbitKit;
    JobbitKitConfig?: JobbitKitGlobalConfig;
  }
}

if (typeof window !== "undefined") {
  window.JobbitKit = JobbitKit;
  if (window.JobbitKitConfig?.autoInit) {
    init(window.JobbitKitConfig);
  }
}

export { initJobbitAnalytics, mountJobbitBadge, shouldShowJobbitBadge };
export default JobbitKit;
