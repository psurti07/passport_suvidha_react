/**
 * Overlays (menus, dialogs, search) render into #ps-portal, which sits inside the
 * `.ps-site` wrapper so the scoped stylesheet applies to them. Falls back to <body>.
 */
export function getPortalRoot(): HTMLElement {
  return document.getElementById('ps-portal') ?? document.body;
}
