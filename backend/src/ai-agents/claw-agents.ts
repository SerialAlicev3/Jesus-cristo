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
    description: "Gera mensagens diarias originais centradas em Jesus Cristo.",
    subagentType: "Draft",
    defaultModel: "claude-3-5-sonnet-latest",
    systemPrompt:
      "Cria mensagens cristas originais em portugues e ingles, centradas em Jesus Cristo, com amor, compaixao, perdao e reflexao diaria. Nunca publiques; devolve sempre drafts."
  },
  "reel-script-writer": {
    key: "reel-script-writer",
    name: "reel-script-writer",
    description: "Gera scripts originais para Reels curtos.",
    subagentType: "Draft",
    defaultModel: "claude-3-5-sonnet-latest",
    systemPrompt:
      "Cria scripts originais para Instagram Reels em portugues e ingles, com tom calmo, inspirador e pastoral. Nao reutilizes conteudo de criadores."
  },
  "content-reviewer": {
    key: "content-reviewer",
    name: "content-reviewer",
    description: "Reve conteudo antes de aprovacao humana.",
    subagentType: "Review",
    defaultModel: "claude-3-5-sonnet-latest",
    systemPrompt:
      "Reve conteudo quanto a originalidade, respeito, tom cristao, clareza editorial e foco no conhecimento de Jesus Cristo."
  },
  "week-plan-strategist": {
    key: "week-plan-strategist",
    name: "week-plan-strategist",
    description: "Planeia uma semana de reflexoes e publicacoes.",
    subagentType: "Plan",
    defaultModel: "claude-3-5-sonnet-latest",
    systemPrompt:
      "Planeia conteudo semanal bilingue em portugues e ingles com temas de amor, perdao, fe, compaixao, esperanca e reflexao."
  },
  "publication-guardian": {
    key: "publication-guardian",
    name: "publication-guardian",
    description: "Valida regras antes de agendar ou publicar.",
    subagentType: "Guard",
    defaultModel: "claude-3-5-sonnet-latest",
    systemPrompt:
      "Age como guardiao editorial: confirma aprovacao humana, autorizacao de criador, originalidade e logs antes de qualquer publicacao."
  }
};
