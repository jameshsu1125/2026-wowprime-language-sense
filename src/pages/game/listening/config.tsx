import { createContext, Dispatch, SetStateAction } from 'react';

export enum ListeningStepType {
  intro,
  question,
}
export type TListeningState = {
  step: ListeningStepType;
  index: number;
  selected: number[];
  isSoundsLoaded: boolean;
};
export type TListeningContext = [TListeningState, Dispatch<SetStateAction<TListeningState>>];

export const ListeningState: TListeningState = {
  step: ListeningStepType.intro,
  index: 0,
  selected: [],
  isSoundsLoaded: false,
};
export const ListeningContext = createContext<TListeningContext>([ListeningState, () => {}]);

export const isHeyLongQuestion: boolean = false;

export const ListeningQuestions = [
  {
    question: { sound: 'sound1', text: '請問說話者最有可能是在對誰說話？' },
    answer: [
      { label: '曖昧對象', isAnswer: false },
      { label: '大學學長', isAnswer: false },
      { label: '白雪公主', isAnswer: true },
    ],
  },
  {
    question: { sound: 'sound2', text: '請問這對情侶最有可能處在什麼情境？' },
    answer: [
      { label: '在冰淇淋店選擇口味', isAnswer: false },
      { label: '在充滿比基尼辣妹的海灘約會', isAnswer: true },
      { label: '上輩子無緣吃冰淇淋', isAnswer: false },
    ],
  },
  {
    question: { sound: 'sound3', text: '請問以下敘述何者正確？' },
    answer: [
      { label: '女生怕吃不完', isAnswer: false },
      { label: '男生暫時沒心思吃飯', isAnswer: true },
      { label: '男生喜歡吃冷的', isAnswer: false },
    ],
  },
  {
    question: { sound: 'sound4', text: '請問男生對女生的情感最有可能是？' },
    answer: [
      { label: '義氣', isAnswer: false },
      { label: '暗戀', isAnswer: true },
      { label: '羡慕', isAnswer: false },
    ],
  },
  {
    question: { sound: 'sound5', text: '請問下列敘述何者正確？' },
    answer: [
      { label: '男生覺得包裝很不方便吃', isAnswer: true },
      { label: '男生覺得自己不美味', isAnswer: false },
      { label: '男生不想跟女生一起吃', isAnswer: false },
    ],
  },
  {
    question: { sound: 'sound6', text: '請問下列敘述何者正確？' },
    answer: [
      { label: '女生喜歡吃雞腳', isAnswer: false },
      { label: '男生對吃沒什麼想法', isAnswer: false },
      { label: '男生的求生欲極強', isAnswer: true },
    ],
  },
  {
    question: { sound: 'sound7', text: '請問兩人口中「一起」的組合分別指的是？' },
    answer: [
      { label: '人與人；食物與食物', isAnswer: true },
      { label: '人與食物；人與食物', isAnswer: false },
      { label: '食物與食物；人與人', isAnswer: false },
    ],
  },
  {
    question: { sound: 'sound8', text: '請問下列敘述何者正確？' },
    answer: [
      { label: '三個人很樂於共享彼此的食物', isAnswer: false },
      { label: 'David 吃素，男主角幫他解圍', isAnswer: false },
      { label: '主角美化理由來佔人便宜', isAnswer: true },
    ],
  },
  {
    question: { sound: 'sound9', text: '請問會拿餐券去吃飯的最有可能是下列何者？' },
    answer: [
      { label: '學長與學弟', isAnswer: false },
      { label: '學弟與他喜歡的人', isAnswer: true },
      { label: '學長與他喜歡的人', isAnswer: false },
    ],
  },
  {
    question: { sound: 'sound10', text: '請問下列敘述何者錯誤？' },
    answer: [
      { label: '姊妹每天早上都會一起吃早餐', isAnswer: false },
      { label: '她們的早餐不好吃', isAnswer: true },
      { label: '妹妹希望姊姊用心跟自己一起好好吃頓飯', isAnswer: false },
    ],
  },
  {
    question: { sound: 'sound11', text: '請問下列敘述何者正確？' },
    answer: [
      { label: '女生也想吃飼料', isAnswer: false },
      { label: '男生很在意飼料費用', isAnswer: false },
      { label: '小咪飼料吃得津津有味', isAnswer: true },
    ],
  },
  {
    question: { sound: 'sound12', text: '請問兩人說的「好好吃」分別是什麼意思？' },
    answer: [
      { label: '健康地吃；享受地吃', isAnswer: false },
      { label: '健康地吃；靈活地吃', isAnswer: true },
      { label: '享受地吃；堅強地吃', isAnswer: false },
    ],
  },
  {
    question: { sound: 'sound13', text: '請問想要吃好好吃的美食，應該要問誰？' },
    answer: [
      { label: '男生', isAnswer: true },
      { label: '女生', isAnswer: false },
      { label: 'AI', isAnswer: false },
    ],
  },
  {
    question: { sound: 'sound14', text: '請問男子最有可能在跟誰說話？' },
    answer: [
      { label: '他的寵物', isAnswer: true },
      { label: '他的恩師', isAnswer: false },
      { label: '他的小被被', isAnswer: false },
    ],
  },
  {
    question: { sound: 'sound15', text: '請問女子在抱怨對方什麼？' },
    answer: [
      { label: '對方在家食物就會變得不好吃', isAnswer: false },
      { label: '對方在外面吃得很開', isAnswer: false },
      { label: '對方很少好好在家吃', isAnswer: true },
    ],
  },
  {
    question: { sound: 'sound16', text: '依據兩人的對話，以下何者有誤？' },
    answer: [
      { label: '女子很希望男子變得好吃', isAnswer: false },
      { label: '男子覺得冷冷的也好吃', isAnswer: false },
      { label: '女子不希望男生吃得隨便', isAnswer: true },
    ],
  },
  {
    question: { sound: 'sound17', text: '請問好好吃的東西是裝在哪裡？' },
    answer: [
      { label: '碗裡', isAnswer: true },
      { label: '餐桌', isAnswer: false },
      { label: '沙發', isAnswer: false },
    ],
  },
  {
    question: { sound: 'sound18', text: '請問下列敘述何者正確？' },
    answer: [
      { label: '嫌犯的媽媽做的飯很鹹', isAnswer: false },
      { label: '女生覺得陪家人好好吃飯很重要', isAnswer: true },
      { label: '男生很羨慕能在家吃閒飯', isAnswer: false },
    ],
  },
  {
    question: { sound: 'sound19', text: '請問下列敘述何者有誤？' },
    answer: [
      { label: '媽媽希望爸爸不要忙到忘了好好吃飯', isAnswer: false },
      { label: '叔叔工作時沒辦法同時吃飯', isAnswer: false },
      { label: '對話反應出叔叔懷才不遇，遭遇貶官的心境', isAnswer: true },
    ],
  },
  {
    question: { sound: 'sound20', text: '請問下列何者最不可能是男子的情緒？' },
    answer: [
      { label: '享受', isAnswer: false },
      { label: '愛慕', isAnswer: false },
      { label: '疑惑', isAnswer: true },
    ],
  },
  {
    question: { sound: 'sound21', text: '請問下列何者最有可能是男子的潛台詞？' },
    answer: [
      { label: '要好好注意身體，多吃點', isAnswer: true },
      { label: '吃吃看，我是不是很會烤', isAnswer: false },
      { label: '快點吃，不要浪費了', isAnswer: false },
    ],
  },
  {
    question: { sound: 'sound22', text: '請問上述最有可能是下列何種情境？' },
    answer: [
      { label: '服務生在意客人是否對餐點滿意', isAnswer: false },
      { label: '媽媽希望女兒放下手邊的事，好好吃飯', isAnswer: true },
      { label: '老師檢查學生的便當有沒有吃乾淨', isAnswer: false },
    ],
  },
  {
    question: { sound: 'sound23', text: '請問下列敘述何者最正確？' },
    answer: [
      { label: 'Andy 很挑食', isAnswer: false },
      { label: '女子沒吃過這種食物', isAnswer: false },
      { label: '女子期待外國朋友也喜歡台灣食物', isAnswer: true },
    ],
  },
];

export const ListeningHeyLongQuestions = [
  {
    question: { sound: 'heyLong1', text: '請問關於黑龍這段話，何者正確？' },
    answer: [
      { label: '黑龍是最好吃的甘比亞人', isAnswer: false },
      { label: '台灣的甘比亞料理很好吃', isAnswer: false },
      { label: '黑龍偷偷宣傳他的頻道', isAnswer: true },
    ],
  },
  {
    question: { sound: 'heyLong2', text: '請問關於黑龍這段話，何者錯誤？' },
    answer: [
      { label: '黑龍這次想獨享美食', isAnswer: false },
      { label: '台灣人很常講下次約，但都沒後續', isAnswer: false },
      { label: '黑龍想一起好好吃只是說説而已', isAnswer: true },
    ],
  },
];
