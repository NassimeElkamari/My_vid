// The boundaries follow the Reel 02 audio-analysis document. Its ASR-derived
// phrase alignments remain provisional until a human listening pass.
export const reel02Timing = {
  fps:30,
  duration:1607,
  sceneStarts:[0,171,399,514,1027,1337,1607],
  fadeFrames:12,
} as const;
export type Cue = {start:number; end:number; lines:readonly [string] | readonly [string,string]; highlight?:string};
const f=(seconds:number) => Math.round(seconds*30);
export const cues:readonly Cue[] = [
  {start:f(0),end:f(1.52),lines:["عمرك سجلتي شي أوديو،"],highlight:"أوديو"},
  {start:f(1.52),end:f(2.74),lines:["وملي سمعتيه قلتي:"],highlight:"سمعتيه"},
  {start:f(2.74),end:f(3.94),lines:["شنو هاد الصوت؟"],highlight:"هاد الصوت"},
  {start:f(3.94),end:f(5.60),lines:["واش أنا اللي كنهضر", "بهاد الطريقة؟!"],highlight:"أنا"},
  {start:f(5.60),end:f(7),lines:["راه ماشي غير نتا!"],highlight:"ماشي غير نتا"},
  {start:f(7),end:f(9.66),lines:["هاد الإحساس كيوقع لينا", "كاملين تقريباً."],highlight:"كاملين"},
  {start:f(9.66),end:f(12.92),lines:["والسبب مخبي فالطريقة", "اللي كنسمعو بها صوتنا."],highlight:"صوتنا"},
  {start:f(12.92),end:f(14.70),lines:["شوف، ملي كنهضرو،"],highlight:"كنهضرو"},
  {start:f(14.70),end:f(16.92),lines:["الصوت كيوصل لودنينا", "عبر الهواء."],highlight:"الهواء"},
  {start:f(16.92),end:f(18.24),lines:["ولكن فنفس الوقت،"],highlight:"فنفس الوقت"},
  {start:f(18.24),end:f(19.76),lines:["الاهتزازات ديال صوتنا"],highlight:"الاهتزازات"},
  {start:f(19.76),end:f(22.40),lines:["كتدوز حتى عبر عظام", "وأنسجة الراس،"],highlight:"عظام"},
  {start:f(22.40),end:f(24.24),lines:["وكتوصل للأذن الداخلية."],highlight:"للأذن الداخلية"},
  {start:f(24.24),end:f(26.68),lines:["يعني حنا كنسمعو صوتنا", "بجوج طرق:"],highlight:"بجوج طرق"},
  {start:f(26.68),end:f(27.64),lines:["عبر الهواء،"],highlight:"الهواء"},
  {start:f(27.64),end:f(30.28),lines:["وعبر الاهتزازات اللي", "كتدوز داخل الراس."],highlight:"الاهتزازات"},
  {start:f(30.28),end:f(31.96),lines:["وهاد الجوج كيتجمعو"],highlight:"كيتجمعو"},
  {start:f(31.96),end:f(34.08),lines:["وكيعطيو لينا الصوت", "اللي متعودين عليه."],highlight:"متعودين عليه"},
  {start:f(34.08),end:f(36.04),lines:["ولكن ملي كنسجلو صوتنا،"],highlight:"كنسجلو"},
  {start:f(36.04),end:f(39.34),lines:["الميكروفون كيلتاقط الصوت", "اللي كيوصل ليه عبر الهواء."],highlight:"الميكروفون"},
  {start:f(39.34),end:f(40.48),lines:["ومنين كنسمعوه،"],highlight:"كنسمعوه"},
  {start:f(40.48),end:f(42.94),lines:["ما كنسمعوش نفس", "الاهتزازات الداخلية"],highlight:"الاهتزازات الداخلية"},
  {start:f(42.94),end:f(44.46),lines:["اللي كانت كترافق كلامنا."],highlight:"كترافق"},
  {start:f(44.46),end:f(46.56),lines:["وداكشي علاش صوتنا فالتسجيل"],highlight:"فالتسجيل"},
  {start:f(46.56),end:f(48.08),lines:["كيقدر يبان لينا مختلف!"],highlight:"مختلف"},
  {start:f(48.08),end:f(50.10),lines:["ماشي بالضرورة", "حيث التسجيل غلط،"],highlight:"ماشي بالضرورة"},
  {start:f(50.10),end:f(53.38),lines:["ولكن حيث حنا متعودين", "نسمعوه بطريقة أخرى."],highlight:"بطريقة أخرى"},
];
