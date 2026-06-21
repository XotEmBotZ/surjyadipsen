type StructuredDataProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JSONLD({ data }: StructuredDataProps) {
  const schemas = Array.isArray(data) ? data : [data];
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
