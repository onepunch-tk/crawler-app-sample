declare interface InstagramSignInResponse {
  userId?: string;
  authenticated: boolean;
}

declare type STATUS_TYPE = "success" | "failure";
declare type ERROR_TYPE = "unauthenticated" | "bad request";

declare interface InstagramCrawlResponse {
  status: STATUS_TYPE;
  error?: ERROR_TYPE;
  results?: [];
}
