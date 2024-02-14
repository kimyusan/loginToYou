export interface DiaryInterface {
  diaryId: number | null;
  coupleId: number | null;
  isThumbnail: number | null;
  originalName: string | null;
  registerDate: string;
  saveFolder: string | null;
  saveName: string | null;
  subject: string | null;
}

export interface DiaryContent {
  content: string | null;
  coupleId: number | null;
  diaryMemoId: number | null;
  registerDate: string | null;
  userId: number | null;
}
