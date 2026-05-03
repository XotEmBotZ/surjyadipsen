type StructuredDataProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JSONLD({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
