interface UserInterface {
  user_id: number;
  email: string;
  name: string;
  mobile?: string | null;
  birthday?: string | null;
  gender?: string | null;
  couple_id?: number | null;
  nickname?: string | null;
  profile_image?: string | null;
}

export type { UserInterface };
