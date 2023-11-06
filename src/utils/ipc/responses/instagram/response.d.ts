declare interface SignInResponse {
  userId?: string;
  authenticated: boolean;
}

declare type STATUS_TYPE = "success" | "failure";
declare type ERROR_TYPE =
  | "unauthenticated"
  | "bad request"
  | "not found element"
  | "not found hashtag result";

declare interface HashtagPageListResponse {
  status: STATUS_TYPE;
  error?: ERROR_TYPE;
  urls?: string[];
}
