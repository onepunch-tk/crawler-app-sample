type SUCCESS = "200";
type UNAUTHORIZED = "401";
type BAD_REQUEST = "400";
type SERVER_ERROR = "500";
type STATUS = SUCCESS | UNAUTHORIZED | BAD_REQUEST | SERVER_ERROR;
interface InstagramDefaultResponse {
  status: STATUS;
  error?: string;
}

interface InstagramSignIn extends Partial<InstagramDefaultResponse> {}
