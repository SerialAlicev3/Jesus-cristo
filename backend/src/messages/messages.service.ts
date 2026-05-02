import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ContentStatus } from "../common/app.types";
import { throwIfSupabaseError } from "../common/database-error";
import { SupabaseService } from "../common/supabase.service";
import { CreateMessageDto } from "./dto";

const fallbackDailyMessages = [
  {
    bible_reference: "1 Corintios 13:4",
    content: "O amor verdadeiro nao apressa, nao humilha e nao abandona. Hoje, escolhe responder com paciencia onde antes responderias com dureza.",
    content_en: "True love does not rush, humiliate or abandon. Today, choose patience where you would usually answer with hardness.",
    theme: "amor",
    title: "O amor como caminho",
    title_en: "Love as the way"
  },
  {
    bible_reference: "Mateus 11:28",
    content: "Ha dias em que a alma fica cansada. Jesus nao pede que escondas esse cansaco; convida-te a descansar nele e a dar apenas o proximo passo.",
    content_en: "There are days when the soul grows tired. Jesus does not ask you to hide that weariness; he invites you to rest in him and take only the next step.",
    theme: "esperanca",
    title: "Descanso para a alma",
    title_en: "Rest for the soul"
  },
  {
    bible_reference: "Joao 14:27",
    content: "A paz de Jesus nao depende de tudo estar perfeito. Ela nasce quando confias que, mesmo na tempestade, nao estas sozinho no barco.",
    content_en: "The peace of Jesus does not depend on everything being perfect. It begins when you trust that, even in the storm, you are not alone in the boat.",
    theme: "fe",
    title: "Paz no meio da tempestade",
    title_en: "Peace in the storm"
  },
  {
    bible_reference: "Lucas 15:20",
    content: "Voltar para Deus nao e perder dignidade; e reencontrar casa. O Pai corre ao encontro de quem regressa com o coracao sincero.",
    content_en: "Returning to God is not losing dignity; it is finding home again. The Father runs toward the one who returns with a sincere heart.",
    theme: "perdao",
    title: "O caminho de volta",
    title_en: "The way back"
  },
  {
    bible_reference: "Mateus 5:7",
    content: "A compaixao muda o ambiente. Quando olhas o outro com misericordia, tambem libertas o teu proprio coracao do peso do julgamento.",
    content_en: "Compassion changes the room. When you look at others with mercy, you also free your own heart from the weight of judgment.",
    theme: "compaixao",
    title: "Olhos de misericordia",
    title_en: "Eyes of mercy"
  },
  {
    bible_reference: "Hebreus 11:1",
    content: "A fe cresce quando damos o proximo passo com humildade, mesmo sem ver o caminho inteiro.",
    content_en: "Faith grows when we take the next step with humility, even without seeing the whole road.",
    theme: "fe",
    title: "Fe no caminho",
    title_en: "Faith on the road"
  },
  {
    bible_reference: "Mateus 7:7",
    content: "Quem procura com verdade ja comecou a bater a porta. Continua. Deus tambem trabalha no silencio entre uma pergunta e uma resposta.",
    content_en: "Whoever seeks with truth has already begun knocking at the door. Keep going. God also works in the silence between a question and an answer.",
    theme: "reflexao",
    title: "Procura com verdade",
    title_en: "Seek with truth"
  }
] as const;

@Injectable()
export class MessagesService {
  constructor(private readonly supabase: SupabaseService) {}

  async today() {
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await this.supabase.client
      .from("messages")
      .select("*")
      .eq("status", "published")
      .gte("publish_date", `${today}T00:00:00.000Z`)
      .lte("publish_date", `${today}T23:59:59.999Z`)
      .order("publish_date", { ascending: false })
      .limit(1)
      .maybeSingle();

    throwIfSupabaseError(error, "Unable to fetch today's message");
    return data ?? this.fallbackToday(today);
  }

  async list() {
    const { data, error } = await this.supabase.client
      .from("messages")
      .select("*")
      .order("publish_date", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });

    throwIfSupabaseError(error, "Unable to list messages");
    return data ?? [];
  }

  async create(dto: CreateMessageDto, status: ContentStatus = "draft") {
    const { data, error } = await this.supabase.client
      .from("messages")
      .insert({ ...dto, status })
      .select()
      .single();

    throwIfSupabaseError(error, "Unable to create message");
    return data;
  }

  async approve(id: string) {
    const { data, error } = await this.supabase.client
      .from("messages")
      .update({ status: "approved" })
      .eq("id", id)
      .in("status", ["draft", "pending_approval"])
      .select()
      .single();

    throwIfSupabaseError(error, "Unable to approve message");
    return data;
  }

  async schedule(id: string, publishDate: string) {
    const current = await this.findById(id);
    if (current.status !== "approved") {
      throw new BadRequestException("Only approved messages can be scheduled");
    }

    const { data, error } = await this.supabase.client
      .from("messages")
      .update({ status: "scheduled", publish_date: publishDate })
      .eq("id", id)
      .select()
      .single();

    throwIfSupabaseError(error, "Unable to schedule message");
    return data;
  }

  async publishScheduled(now = new Date()) {
    const { data, error } = await this.supabase.client
      .from("messages")
      .update({ status: "published" })
      .eq("status", "scheduled")
      .lte("publish_date", now.toISOString())
      .select();

    throwIfSupabaseError(error, "Unable to publish scheduled messages");
    return data ?? [];
  }

  private async findById(id: string) {
    const { data, error } = await this.supabase.client
      .from("messages")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      throw new NotFoundException("Message not found");
    }

    return data;
  }

  private fallbackToday(date: string) {
    const dateIndex = Math.floor(new Date(`${date}T00:00:00.000Z`).getTime() / 86_400_000);
    const message = fallbackDailyMessages[dateIndex % fallbackDailyMessages.length];

    return {
      id: `fallback-${date}`,
      ...message,
      publish_date: `${date}T00:00:00.000Z`,
      status: "published"
    };
  }
}
