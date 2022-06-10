import React from "react";

export type Icons =
  | "bell-o"
  | "bell"
  | "bolt"
  | "check-circle-o"
  | "check-circle"
  | "check"
  | "dot-circle-o"
  | "exclamation-circle"
  | "question-circle-o"
  | "question-circle"
  | "sign-in"
  | "sign-out"
  | "times-circle-o"
  | "times-circle"
  | "times";

export type PlainObject<T = any> = Record<string, T>;

export interface RouteProps {
  component: React.ComponentType<any>;
  exact?: boolean;
  isAuthenticated: boolean;
  path: string;
  to?: string;
}
