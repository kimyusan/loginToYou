interface UserInterface {
  userId: number | null;
  email: string | null;
  name: string | null;
  mobile?: string | null;
  birthday?: string | null;
  gender?: string | null;
  coupleId?: number | null;
  nickname?: string | null;
  profileImage?: string | null;
}

export type { UserInterface };
