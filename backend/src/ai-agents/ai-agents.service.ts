import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { MessageTheme } from "../common/app.types";
import { SupabaseService } from "../common/supabase.service";
import { CreateMessageDto } from "../messages/dto";
import { MessagesService } from "../messages/messages.service";
import { ClawAgentKey, clawAgents } from "./claw-agents";
import { GenerateMessageDto, GenerateReelScriptDto, GenerateWeekPlanDto } from "./dto";

@Injectable()
export class AiAgentsService {
  private readonly claude?: Anthropic;
  private readonly openai?: OpenAI;
  private readonly claudeModel: string;
  private readonly openAiModel: string;

  constructor(
    config: ConfigService,
    private readonly messages: MessagesService,
    private readonly supabase: SupabaseService
  ) {
    const anthropicKey = config.get<string>("ANTHROPIC_API_KEY");
    const openAiKey = config.get<string>("OPENAI_API_KEY");
    this.claudeModel = config.get<string>("CLAUDE_MODEL", "claude-3-5-sonnet-latest");
    this.openAiModel = config.get<string>("OPENAI_MODEL", "gpt-4o-mini");
    this.claude = anthropicKey ? new Anthropic({ apiKey: anthropicKey }) : undefined;
    this.openai = openAiKey ? new OpenAI({ apiKey: openAiKey }) : undefined;
  }

  listAgents() {
    return Object.values(clawAgents).map(({ systemPrompt, ...agent }) => agent);
  }

  async generateMessage(dto: GenerateMessageDto) {
    const content = await this.completeJson({
      agentKey: "daily-message-writer",
      system: this.composeSystemPrompt("daily-message-writer"),
      user: `Gera uma reflexao diaria crista bilingue em portugues e ingles. Tema: ${dto.theme}. Referencia biblica: ${dto.bible_reference ?? "escolhe uma referencia adequada"}. Responde em JSON com title, title_en, content, content_en, bible_reference, theme.`
    });

    return this.messages.create(this.coerceMessage(content, dto), "draft");
  }

  async generateReelScript(dto: GenerateReelScriptDto) {
    return this.completeJson({
      agentKey: "reel-script-writer",
      system: this.composeSystemPrompt("reel-script-writer"),
      user: `Gera um script original bilingue para Instagram Reel em portugues e ingles sobre ${dto.theme}. Duracao: ${dto.duration ?? "30 segundos"}. Responde em JSON com title, title_en, hook, hook_en, script, script_en, caption, caption_en, visual_notes, visual_notes_en.`
    });
  }

  async reviewContent(content: string) {
    return this.completeJson({
      agentKey: "content-reviewer",
      system: this.composeSystemPrompt("content-reviewer"),
      user: `Reve este conteudo em portugues e ingles quanto a tom, originalidade, clareza, profundidade espiritual e foco no conhecimento de Jesus Cristo. Responde em JSON com approved, risks, risks_en, suggestions, suggestions_en. Conteudo: ${content}`
    });
  }

  async generateWeekPlan(dto: GenerateWeekPlanDto) {
    const startsOn = dto.starts_on ?? new Date().toISOString().slice(0, 10);
    const plan = await this.completeJson({
      agentKey: "week-plan-strategist",
      system: this.composeSystemPrompt("week-plan-strategist"),
      user: `Cria um plano de 7 dias bilingue em portugues e ingles a comecar em ${startsOn}. Responde em JSON com uma propriedade items, contendo title, title_en, content, content_en, bible_reference, theme.`
    });

    const record = typeof plan === "object" && plan !== null ? (plan as Record<string, unknown>) : {};
    const items = Array.isArray(record.items) ? record.items : [];
    const drafts = [];

    for (const item of items.slice(0, 7)) {
      drafts.push(await this.messages.create(this.coerceMessage(item, { theme: "reflexao" }), "draft"));
    }

    return { starts_on: startsOn, drafts };
  }

  private async completeJson(input: { agentKey: ClawAgentKey; system: string; user: string }) {
    if (!this.claude && !this.openai) {
      const fallback = this.fallbackJson(input.user);
      await this.logAgentRun(input.agentKey, input.user, fallback, "completed", "local-fallback");
      return fallback;
    }

    try {
      const output = this.claude
        ? await this.completeWithClaude(input.system, input.user)
        : await this.completeWithOpenAi(input.system, input.user);

      await this.logAgentRun(input.agentKey, input.user, output, "completed", this.currentModel());
      return output;
    } catch (error) {
      await this.logAgentRun(input.agentKey, input.user, this.serializeError(error), "failed", this.currentModel());
      throw error;
    }
  }

  private async completeWithClaude(system: string, user: string) {
    const response = await this.claude!.messages.create({
      model: this.claudeModel,
      max_tokens: 1200,
      system: `${system} Responde apenas com JSON valido.`,
      messages: [{ role: "user", content: user }]
    });

    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");

    return JSON.parse(text || "{}") as unknown;
  }

  private async completeWithOpenAi(system: string, user: string) {
    const response = await this.openai!.chat.completions.create({
      model: this.openAiModel,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ]
    });

    return JSON.parse(response.choices[0]?.message.content ?? "{}") as unknown;
  }

  private composeSystemPrompt(agentKey: ClawAgentKey) {
    const agent = clawAgents[agentKey];
    return [
      `Claude Agent: ${agent.name}. Tipo: ${agent.subagentType}.`,
      agent.systemPrompt,
      "O tom deve refletir amor, compaixao, perdao, esperanca e reflexao diaria.",
      "Mantem respeito, humildade e foco no conhecimento de Jesus Cristo.",
      "Sempre que criares conteudo para a plataforma, escreve em portugues e ingles.",
      "Nunca declares permissao para reutilizar conteudo de terceiros.",
      "Todo conteudo gerado e draft editorial, nao aprovado nem publicado."
    ].join(" ");
  }

  private coerceMessage(value: unknown, fallback: GenerateMessageDto): CreateMessageDto {
    const record = typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
    const theme = this.normalizeTheme(record.theme, fallback.theme);

    return {
      title: String(record.title ?? "Reflexao diaria"),
      title_en: String(record.title_en ?? "Daily reflection"),
      content: String(record.content ?? "Que o amor de Jesus nos conduza hoje em compaixao, perdao e paz."),
      content_en: String(record.content_en ?? "May the love of Jesus guide us today in compassion, forgiveness and peace."),
      bible_reference: String(record.bible_reference ?? fallback.bible_reference ?? ""),
      theme
    };
  }

  private normalizeTheme(value: unknown, fallback: MessageTheme): MessageTheme {
    const allowed: MessageTheme[] = ["amor", "perdao", "fe", "compaixao", "esperanca", "reflexao"];
    return allowed.includes(value as MessageTheme) ? (value as MessageTheme) : fallback;
  }

  private fallbackJson(prompt: string) {
    if (prompt.includes("7 dias")) {
      return {
        items: [
          {
            title: "Amor que serve",
            title_en: "Love that serves",
            content: "Hoje somos convidados a amar com gestos simples, sem procurar aplauso.",
            content_en: "Today we are invited to love through simple acts, without seeking applause.",
            bible_reference: "Joao 13:34",
            theme: "amor"
          }
        ]
      };
    }

    if (prompt.includes("Instagram Reel")) {
      return {
        title: "Um minuto de paz",
        title_en: "One minute of peace",
        hook: "Respira fundo: a graca de hoje chega para hoje.",
        hook_en: "Take a deep breath: today's grace is enough for today.",
        script: "Fala sobre receber o amor de Jesus e transformar esse amor em perdao pratico.",
        script_en: "Speak about receiving the love of Jesus and turning that love into practical forgiveness.",
        caption: "Que o amor de Cristo se torne gesto concreto hoje.",
        caption_en: "May the love of Christ become a concrete act today.",
        visual_notes: "Plano calmo, luz natural, texto curto no ecra.",
        visual_notes_en: "Calm shot, natural light, short on-screen text."
      };
    }

    if (prompt.includes("Reve")) {
      return { approved: true, risks: [], suggestions: ["Manter tom humilde e inclusivo."] };
    }

    return {
      title: "Amor que recomeca",
      title_en: "Love that begins again",
      content: "Em Jesus encontramos a coragem de perdoar, servir e recomecar com mansidao.",
      content_en: "In Jesus we find the courage to forgive, serve and begin again with gentleness.",
      bible_reference: "Lucas 6:36",
      theme: "amor"
    };
  }

  private async logAgentRun(
    agentKey: ClawAgentKey,
    input: string,
    output: unknown,
    status: "completed" | "failed",
    model: string
  ) {
    await this.supabase.client.from("ai_agent_runs").insert({
      agent_key: agentKey,
      agent_name: clawAgents[agentKey].name,
      subagent_type: clawAgents[agentKey].subagentType,
      model,
      status,
      input,
      output
    });
  }

  private currentModel() {
    return this.claude ? this.claudeModel : this.openAiModel;
  }

  private serializeError(error: unknown) {
    if (error instanceof Error) {
      return { name: error.name, message: error.message };
    }

    return { message: String(error) };
  }
}
