// The Settings row that puts an agent on Recommended, or back on its own
// model settings, for a type that follows Recommended.
import { Select } from "../../shared/design-system/ui/Select";
import {
  candidatesFor,
  type RecommendedCandidate,
  recommendedSummary,
} from "./recommended";

const RECOMMENDED = "recommended";
const CHOICES = [
  {
    label: "",
    options: [
      { value: RECOMMENDED, label: "Automatic (Recommended)" },
      { value: "custom", label: "Custom" },
    ],
  },
];

/** Nothing when this build recommends nothing for `harness`. */
export function RecommendedSetting({
  harness,
  title,
  on,
  resolved,
  disabled = false,
  onChange,
}: Readonly<{
  harness: string;
  /** The type's title, e.g. Codex. */
  title: string;
  on: boolean;
  /** What it runs on: undefined while checking, `null` for the harness's
   * default when none of the candidates is offered. */
  resolved: RecommendedCandidate | null | undefined;
  disabled?: boolean;
  onChange(on: boolean): void;
}>) {
  if (!candidatesFor(harness).length) return null;
  const description =
    resolved === undefined
      ? "Checking which recommended model this computer offers…"
      : resolved
        ? `Currently ${recommendedSummary(title, resolved)}. Buzz keeps it up to date.`
        : `No recommended model is offered here now, so it uses ${title}'s default.`;
  return (
    <Select
      label="Model settings"
      variant="preference"
      value={on ? RECOMMENDED : "custom"}
      {...(on ? { description } : {})}
      disabled={disabled}
      groups={CHOICES}
      onValueChange={(value) => onChange(value === RECOMMENDED)}
    />
  );
}
