import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { AuthenticatedUser } from "../common/app.types";
import { SupabaseService } from "../common/supabase.service";

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly supabase: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException("Missing bearer token");
    }

    const { data: authData, error: authError } = await this.supabase.client.auth.getUser(token);
    if (authError || !authData.user?.email) {
      throw new UnauthorizedException("Invalid bearer token");
    }

    const { data: profile, error: profileError } = await this.supabase.client
      .from("users")
      .select("id,email,role")
      .eq("id", authData.user.id)
      .single();

    if (profileError || !profile) {
      throw new UnauthorizedException("User profile not found");
    }

    request.user = {
      id: String(profile.id),
      email: String(profile.email),
      role: profile.role as AuthenticatedUser["role"]
    };

    return true;
  }

  private extractToken(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
