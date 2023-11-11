type CoupangDefaultResponse = {
  ok: boolean;
  error?: string;
};
type CP_DefaultCategory = {
  id: string;
  content: string;
};
type CP_SecondDepthCategory = CP_DefaultCategory & {
  thirdDepth?: CP_DefaultCategory[];
};
type CP_FirstDepthCategory = CP_DefaultCategory & {
  secondDepth?: CP_SecondDepthCategory[];
};

type CoupangCategoriesResponse = CoupangDefaultResponse & {
  results?: CP_FirstDepthCategory[];
};
