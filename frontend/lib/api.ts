const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";

export interface DailyMessage {
  title: string;
  title_en?: string;
  content: string;
  content_en?: string;
  bible_reference?: string;
  theme?: string;
}

const fallbackDailyMessages: DailyMessage[] = [
  {
    title: "Amor que recomeca",
    title_en: "Love that begins again",
    content: "Hoje e um bom dia para voltar ao essencial: aprender com Jesus, escolher a mansidao e transformar o amor em gesto concreto.",
    content_en: "Today is a good day to return to what matters: learn from Jesus, choose gentleness and turn love into a concrete act.",
    bible_reference: "Lucas 6:36",
    theme: "amor"
  },
  {
    title: "Perdao que liberta",
    title_en: "Forgiveness that frees",
    content: "Perdoar nao apaga a verdade, mas abre espaco para a paz crescer onde antes havia peso.",
    content_en: "Forgiveness does not erase truth, but it opens space for peace to grow where there was weight before.",
    bible_reference: "Mateus 6:14",
    theme: "perdao"
  },
  {
    title: "Fe no caminho",
    title_en: "Faith on the road",
    content: "A fe cresce quando damos o proximo passo com humildade, mesmo sem ver todo o caminho.",
    content_en: "Faith grows when we take the next step with humility, even when we cannot see the whole road.",
    bible_reference: "Hebreus 11:1",
    theme: "fe"
  },
  {
    title: "Compaixao em movimento",
    title_en: "Compassion in motion",
    content: "Jesus ensina-nos a reparar em quem esta perto, ouvir com atencao e servir sem fazer ruido.",
    content_en: "Jesus teaches us to notice who is near, listen with care and serve without making noise.",
    bible_reference: "Marcos 6:34",
    theme: "compaixao"
  },
  {
    title: "Esperanca para hoje",
    title_en: "Hope for today",
    content: "A esperanca nao precisa de ser grande para ser real; basta acender uma luz fiel dentro deste dia.",
    content_en: "Hope does not need to be large to be real; it only needs to light a faithful flame within this day.",
    bible_reference: "Romanos 15:13",
    theme: "esperanca"
  },
  {
    title: "Paz no coracao",
    title_en: "Peace in the heart",
    content: "Antes de responder ao mundo, respira com Deus. A paz de Cristo tambem se aprende no silencio.",
    content_en: "Before answering the world, breathe with God. The peace of Christ is also learned in silence.",
    bible_reference: "Joao 14:27",
    theme: "reflexao"
  },
  {
    title: "Luz simples",
    title_en: "Simple light",
    content: "Um gesto pequeno feito com amor pode ser a luz que alguem precisava para continuar.",
    content_en: "A small act done with love can be the light someone needed to keep going.",
    bible_reference: "Mateus 5:16",
    theme: "amor"
  }
];

function getFallbackDailyMessage(date = new Date()): DailyMessage {
  const startOfYear = Date.UTC(date.getUTCFullYear(), 0, 1);
  const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const dayOfYear = Math.floor((today - startOfYear) / 86_400_000);

  return fallbackDailyMessages[dayOfYear % fallbackDailyMessages.length];
}

export async function getDailyMessage(): Promise<DailyMessage | null> {
  try {
    const response = await fetch(`${apiBaseUrl}/messages/today`, {
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      return getFallbackDailyMessage();
    }

    return ((await response.json()) as DailyMessage | null) ?? getFallbackDailyMessage();
  } catch {
    return getFallbackDailyMessage();
  }
}
