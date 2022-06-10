import Cookie from "js-cookie";
import { MissingUserInStoreError } from "../errors";
import { IUser } from "../structures";

export enum Keys {
  AccessToken = "Bearer",
  RefreshToken = "Refresh",
  Role = "Role",
  User = "User",
}

class CookieAuthService {
  public getAccessToken(): string | undefined {
    return Cookie.get(Keys.AccessToken);
  }

  public setTokens(accessToken: string, refreshToken: string): void {
    Cookie.set(Keys.AccessToken, accessToken);
    Cookie.set(Keys.RefreshToken, refreshToken);
  }

  public unsetTokens(): boolean {
    Cookie.remove(Keys.AccessToken);
    Cookie.remove(Keys.RefreshToken);

    return true;
  }

  public setRole(role: string): void {
    Cookie.set(Keys.Role, role);
  }

  public getRole(): string | undefined {
    return Cookie.get(Keys.Role);
  }

  public unsetRole(): void {
    Cookie.remove(Keys.Role);
  }

  public setUser(user: IUser): void {
    Cookie.set(Keys.User, JSON.stringify(user));
  }

  public getUser(): IUser | null {
    const user = Cookie.get(Keys.User);
    if (!user) {
      throw new MissingUserInStoreError();
    }
    try {
      return JSON.parse(user) as IUser;
    } catch (error) {
      console.log(error, "Get user from cookies store");
      return null;
    }
  }

  public unsetUser(): void {
    Cookie.remove(Keys.User);
  }

  public logoutClear(): void {
    this.unsetTokens();
    this.unsetRole();
    this.unsetUser();
  }
}

export const cookieAuthService = new CookieAuthService();
