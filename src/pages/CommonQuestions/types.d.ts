export interface Ifilter {
  question?: string;
  topic?: string;
}
export interface Question {
  id: string;
  question: string;
  answer: string;
  priority: string;
  topic: string;
  userType: string;
  active: boolean | string;
  createdAt: string;
}

export interface QuestionGroup {
  [key: string]: Question[];
}

export interface IListFiltered {
  [key: string]: Question[];
}
