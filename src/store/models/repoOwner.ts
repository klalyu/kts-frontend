export type OwnerApi = {
  login: string;
  avatar_url: string;
};

export type OwnerModel = {
  name: string;
  avatarUrl: string;
};

export const normalizeOwner = (from: OwnerApi): OwnerModel => ({
  name: from.login,
  avatarUrl: from.avatar_url,
});
