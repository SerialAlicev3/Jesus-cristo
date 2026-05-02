import { BadRequestException, InternalServerErrorException } from "@nestjs/common";

interface SupabaseError {
  code?: string;
  message?: string;
}

export function throwIfSupabaseError(error: SupabaseError | null, context: string): void {
  if (!error) {
    return;
  }

  if (error.code?.startsWith("23")) {
    throw new BadRequestException(`${context}: ${error.message ?? "constraint violation"}`);
  }

  throw new InternalServerErrorException(`${context}: ${error.message ?? "database error"}`);
}
