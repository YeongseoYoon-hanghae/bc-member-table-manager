import { Key } from "react";

export interface MemberData {
  key: Key;
  name: string;
  address: string;
  memo: string;
  createdAt: Date;
  job: string;
  emailAgree: boolean;
}
