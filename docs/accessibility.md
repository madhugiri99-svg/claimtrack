# Accessibility notes

Target: **WCAG 2.2 AA**. Accessibility was checked from the first pull request, not at the end: lint rules (jsx-a11y), the Storybook a11y panel on every component, and automated plus manual checks on every page.

## What was fixed

| Issue found                                                                                                             | WCAG criterion                                     | Fix                                                                                                               | Where                                 |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| The client's brand teal `#2BB3B1` was 2.6:1 on white, too low for text or buttons                                       | 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast | Darkened to `#0E7C7B` (5.0:1) for text and buttons; the original teal is now decorative only (logo mark)          | Figma variables, PR #2                |
| Darkened teal on its light tint was 4.44:1, just under AA                                                               | 1.4.3 Contrast (Minimum)                           | Text on tinted backgrounds uses `#0B6564` (6.9:1)                                                                 | Figma variables, PR #2                |
| Warning alerts used `role="alert"`, so the "Action needed" banner was read out every time a page loaded                 | 4.1.3 Status Messages                              | Alerts only announce when they appear after a user action (`announce` prop). Page-load banners are normal content | Found in code review, PR #3           |
| Claim cards on the "My claims" page jumped from h1 to h3                                                                | 1.3.1 Info and Relationships                       | Card heading level follows the page outline (h2 there, h3 under Overview's h2 section)                            | Found by axe, screens PR              |
| Opening the phone menu left focus on the menu button, because the panel was still hidden for a moment                   | 2.4.3 Focus Order                                  | Panel becomes visible instantly on open (hides only after sliding out), so focus moves to the first link          | Found in keyboard testing, screens PR |
| Disabled buttons using the native `disabled` attribute drop out of the tab order, so people can't find them or hear why | 2.1.1 Keyboard                                     | Buttons use `aria-disabled` and block clicks in code, staying focusable                                           | Components PR #3                      |

## What's built in

- **Keyboard:** skip link to main content; every action reachable with Tab, Enter and Space; Escape closes the phone menu and returns focus to the menu button; one visible focus ring everywhere (3px, `#1D5FB8`).
- **Screen readers:** focus moves to each new page's `<h1>` after navigation and the tab title updates; search and filter results are announced ("2 claims found"); upload errors and success are announced; claim progress is an ordered list with `aria-current="step"`; the claims table uses `<th scope="col">` and a caption; icon-only nav links keep their text label as the accessible name.
- **Not color alone:** status badges always have a text label; the active nav item is bold with a background; timeline states have text ("Current step", or hidden "Completed"/"Upcoming").
- **Forms:** visible labels (never placeholder-only); file errors are tied to the input with `aria-describedby` and `aria-invalid`; 16px inputs so iOS doesn't zoom.
- **Touch and zoom:** 44px minimum touch targets; layouts tested at 375, 768 and 1280px with no horizontal scroll; `prefers-reduced-motion` turns off animations.

## How it was tested

| Check                 | Tool                                                                                             | Result                                     |
| --------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| Automated, components | axe-core on all Storybook stories (WCAG 2.2 A/AA + best practices)                               | 0 violations                               |
| Automated, pages      | axe-core on every page at 375px and 1280px                                                       | 0 violations (after the heading fix above) |
| Keyboard              | Scripted keyboard pass: skip link, menu open/Escape, navigation focus, upload flow               | Pass (after the menu focus fix above)      |
| Contrast              | Every color token checked; ratios listed in Storybook → Foundations/Colors and in the Figma file | All text ≥ 4.5:1, UI ≥ 3:1                 |
| Screen reader         | VoiceOver on iPhone, three key tasks                                                             | _To do: add results_                       |

## Known gaps

- Not yet tested with NVDA or JAWS on Windows.
- The Documents and Help pages are placeholders outside the MVP scope.
