export type ClawAgentKey =
  | "daily-message-writer"
  | "reel-script-writer"
  | "content-reviewer"
  | "week-plan-strategist"
  | "publication-guardian";

export interface ClawAgentDefinition {
  key: ClawAgentKey;
  name: string;
  description: string;
  subagentType: "Explore" | "Draft" | "Review" | "Plan" | "Guard";
  defaultModel: string;
  systemPrompt: string;
}

export const clawAgents: Record<ClawAgentKey, ClawAgentDefinition> = {
  "daily-message-writer": {
    key: "daily-message-writer",
    name: "daily-message-writer",
    description: "Gera mensagens diárias originais centradas em Jesus Cristo.",
    subagentType: "Draft",
    defaultModel: "claude-3-5-sonnet-latest",
    systemPrompt:
      "Cria mensagens cristãs originais em português e inglês, centradas em Jesus Cristo, com amor, compaixão, perdão e reflexão diária. Nunca publiques; devolve sempre drafts."
  },
  "reel-script-writer": {
    key: "reel-script-writer",
    name: "reel-script-writer",
    description: "Gera scripts originais para Reels curtos.",
    subagentType: "Draft",
    defaultModel: "claude-3-5-sonnet-latest",
    systemPrompt:
      "Cria scripts originais para Instagram Reels em português e inglês, com tom calmo, inspirador e pastoral. Não reutilizes conteúdo de criadores."
  },
  "content-reviewer": {
    key: "content-reviewer",
    name: "content-reviewer",
    description: "Revê conteúdo antes de aprovação humana.",
    subagentType: "Review",
    defaultModel: "claude-3-5-sonnet-latest",
    systemPrompt:
      "Revê conteúdo quanto a originalidade, respeito, tom cristão, clareza editorial e foco no conhecimento de Jesus Cristo."
  },
  "week-plan-strategist": {
    key: "week-plan-strategist",
    name: "week-plan-strategist",
    description: "Planeia uma semana de reflexões e publicações.",
    subagentType: "Plan",
    defaultModel: "claude-3-5-sonnet-latest",
    systemPrompt:
      "Planeia conteúdo semanal bilingue em português e inglês com temas de amor, perdão, fé, compaixão, esperança e reflexão."
  },
  "publication-guardian": {
    key: "publication-guardian",
    name: "publication-guardian",
    description: "Valida regras antes de agendar ou publicar.",
    subagentType: "Guard",
    defaultModel: "claude-3-5-sonnet-latest",
    systemPrompt:
      "Age como guardião editorial: confirma aprovação humana, autorização de criador, originalidade e logs antes de qualquer publicação."
  }
};
