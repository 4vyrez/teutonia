type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Server-only JSON-LD renderer. The payload is generated from typed,
 * trusted data in lib/seo.ts (no user input). React server-renders
 * the JSON as the script's textContent without client hydration.
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script type="application/ld+json" suppressHydrationWarning>
      {json}
    </script>
  );
}
