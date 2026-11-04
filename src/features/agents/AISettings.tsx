// The "AI settings" choice shared by Create agent and an agent's Settings:
// Automatic (Recommended), or the harness and model chosen manually.
import type { ReactNode } from "react";
import { Field } from "../../shared/design-system/ui/Field";
import { Radio, RadioGroup } from "../../shared/design-system/ui/RadioGroup";
import {
  type RecommendedCandidate,
  recommendedCandidates,
  recommendedSummary,
} from "./recommended";

/** What an agent of `harness` on Recommended runs on: undefined while it is
 * being found, `null` for the harness's default when nothing is offered. */
export function currentLine(
  title: string,
  resolved: RecommendedCandidate | null | undefined,
) {
  return resolved === undefined
    ? "Checking this computer…"
    : resolved
      ? `Currently: ${recommendedSummary(title, resolved)}`
      : `No recommended model is offered here now, so it uses ${title}'s default.`;
}

/** Settings never change an agent's harness; said when another is preferred. */
export function keptHarnessLine(harness: string, title: string) {
  const [best] = recommendedCandidates();
  return best && best.harness !== harness
    ? `It stays on ${title}; choose manually to change its harness.`
    : undefined;
}

export function AISettings({
  automatic,
  lines,
  disabled = false,
  onChange,
  children,
}: Readonly<{
  automatic: boolean;
  /** Under the Automatic card's description, e.g. what it runs on now. */
  lines: readonly (string | undefined)[];
  disabled?: boolean;
  onChange(automatic: boolean): void;
  /** The manual controls, shown while Choose manually is selected. */
  children: ReactNode;
}>) {
  return (
    <div className="grid gap-3">
      <Field label="AI settings" nativeLabel={false}>
        <RadioGroup
          aria-label="AI settings"
          value={automatic ? "automatic" : "manual"}
          disabled={disabled}
          onValueChange={(value) => onChange(value === "automatic")}
        >
          <Radio
            value="automatic"
            variant="card"
            label="Automatic (Recommended)"
            description={
              <>
                We choose a general-purpose harness and model that balance
                intelligence and cost, and keep it up to date for you.
                {lines.filter(Boolean).map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </>
            }
          />
          <Radio
            value="manual"
            variant="card"
            label="Choose manually"
            description="Pick the harness, model and thinking level yourself."
          />
        </RadioGroup>
      </Field>
      {!automatic && children}
    </div>
  );
}
