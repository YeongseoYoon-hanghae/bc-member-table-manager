import { MemberData } from "../types/member.type";

export const initialMembers: MemberData[] = [
  {
    key: "1",
    name: "John Doe",
    address: "서울 강남구",
    memo: "외국인",
    createdAt: new Date("2024-10-02"),
    job: "개발자",
    emailAgree: true,
  },
  {
    key: "2",
    name: "Foo Bar",
    address: "서울 서초구",
    memo: "한국인",
    createdAt: new Date("2024-10-01"),
    job: "PO",
    emailAgree: false,
  },
];
