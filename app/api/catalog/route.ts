type AirtableRecord = { id: string; fields: Record<string, unknown> };

const baseId = () => process.env.AIRTABLE_BASE_ID;
const token = () => process.env.AIRTABLE_TOKEN;

function attachmentUrl(value: unknown): string | null {
  if (!Array.isArray(value) || !value.length) return null;
  const first = value[0] as { url?: unknown };
  return typeof first?.url === "string" ? first.url : null;
}

async function listPublished(tableId: string, statusField: string) {
  const url = new URL(`https://api.airtable.com/v0/${baseId()}/${tableId}`);
  url.searchParams.set("pageSize", "100");
  url.searchParams.set("filterByFormula", `{${statusField}}='Publicado'`);
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token()}` },
    next: { revalidate: 300 },
  });
  if (!response.ok) throw new Error(`Airtable request failed (${response.status})`);
  const payload = (await response.json()) as { records?: AirtableRecord[] };
  return payload.records ?? [];
}

export async function GET() {
  if (!baseId() || !token()) {
    return Response.json({ error: "Airtable is not configured" }, { status: 503 });
  }
  try {
    const [productRecords, themeRecords] = await Promise.all([
      listPublished(process.env.AIRTABLE_PRODUCTS_TABLE_ID!, "Status de Publicação"),
      listPublished(process.env.AIRTABLE_THEMES_TABLE_ID!, "Status"),
    ]);
    const products = productRecords.map(({ id, fields }) => ({
      id,
      name: fields["Nome de Exibição"] ?? fields["Nome Original"] ?? "Produto",
      slug: fields.Slug ?? id,
      image: attachmentUrl(fields["Imagem Principal"]),
      price: fields.Preço ?? null,
      category: fields.Categoria ?? null,
    }));
    const celebrations = themeRecords.map(({ id, fields }) => ({
      id,
      name: fields["Nome da Festa"] ?? "Celebração",
      slug: fields.Slug ?? id,
      image: attachmentUrl(fields["Imagem do Card"]),
      occasion: fields.Ocasião ?? null,
    }));
    return Response.json({ products, celebrations }, { headers: { "Cache-Control": "public, max-age=300" } });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Airtable request failed" }, { status: 502 });
  }
}

