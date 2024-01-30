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
  password?: string | null;
}

interface CoupleInterface {
  coupleId: number | null;
  name: string | null;
  startDate: string | null;
  fuserId: number | null;
  suserId: number | null;
}

export type { UserInterface, CoupleInterface };
