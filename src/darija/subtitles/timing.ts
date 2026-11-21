/** Frame ranges are start-inclusive, end-exclusive, at 30 fps.
 * Boundaries follow the local word-timestamp pass over the mastered narration;
 * the text is the user-approved transcript. */
export type SubtitleCue = {
  start: number;
  end: number;
  lines: readonly [string] | readonly [string, string];
  highlights: readonly string[];
  top?: number;
};

export const subtitleCues: readonly SubtitleCue[] = [
  {start:0,end:107,lines:["واش عمرك تسولتي علاش", "كنشوفو البرق قبل ما نسمعو الرعد؟"],highlights:["البرق", "الرعد"]},
  {start:107,end:194,lines:["مع أن بجوج كيوقعو تقريباً", "فنفس اللحظة؟"],highlights:["فنفس اللحظة"]},
  {start:194,end:297,lines:["الجواب بسيط، ولكن فيه", "واحد المعلومة مدهشة!"],highlights:["مدهشة"]},
  {start:297,end:391,lines:["البرق هو داك الضو القوي", "اللي كنشوف فالسماء،"],highlights:["البرق", "الضو"]},
  {start:391,end:482,lines:["والرعد هو الصوت اللي كينتج", "على نفس الظاهرة."],highlights:["الرعد", "الصوت"]},
  {start:482,end:554,lines:["ولكن الفرق الكبير هو السرعة!"],highlights:["السرعة"]},
  {start:554,end:637,lines:["الضو سريع بزاف،", "كيسافر بسرعة"],highlights:["سريع بزاف"]},
  {start:637,end:710,lines:["تقريباً ثلاثمية ألف", "كيلومتر فالثانية."],highlights:["ثلاثمية ألف"]},
  {start:710,end:829,lines:["يعني منين كيوقع البرق،", "الضو كيوصل لعينيك تقريباً فالحين."],highlights:["فالحين"]},
  {start:829,end:903,lines:["أما الصوت فكيكون أبطأ بزاف،"],highlights:["أبطأ بزاف"]},
  {start:903,end:1006,lines:["وكيحتاج وقت باش ينتاقل فالهواء", "ويوصل حتى لعندك."],highlights:["وقت"]},
  {start:1006,end:1093,lines:["وهنا كاينة واحد الحيلة", "تقدر تجربها بوحدك!"],highlights:["الحيلة"]},
  {top:620,start:1093,end:1192,lines:["منين تشوف البرق، بدا حسب الثواني", "حتى تسمع الرعد."],highlights:["الثواني"]},
  {top:620,start:1192,end:1243,lines:["كل ثلاث ثواني تقريباً"],highlights:["ثلاث ثواني"]},
  {top:620,start:1243,end:1346,lines:["كتعني أن العاصفة بعيدة عليك", "بحوالي كيلومتر واحد."],highlights:["كيلومتر واحد"]},
  {top:620,start:1346,end:1449,lines:["مثلاً، إلا حسبتي تسع ثواني", "بين البرق والرعد،"],highlights:["تسع ثواني"]},
  {top:620,start:1449,end:1517,lines:["فهذا كيعني أن العاصفة", "ممكن تكون"],highlights:["العاصفة"]},
  {top:620,start:1517,end:1578,lines:["على بعد ثلاثة كيلومترات تقريباً."],highlights:["ثلاثة كيلومترات"]},
  {start:1578,end:1614,lines:["ولكن رد بالك!"],highlights:["رد بالك"]},
  {start:1614,end:1659,lines:["إلا سمعتي الرعد، راه"],highlights:["الرعد"]},
  {start:1659,end:1748,lines:["العاصفة قريبة بما يكفي", "باش تكون معرض للخطر."],highlights:["للخطر"]},
  {start:1748,end:1831,lines:["دخل لدار ولا لسيارة مسدودة", "بسقف صلب،"],highlights:["سقف صلب"]},
  {start:1831,end:1925,lines:["وبقى تما حتى يدوزو ثلاثين دقيقة", "من آخر رعدة."],highlights:["ثلاثين دقيقة"]},
  {start:1925,end:1994,lines:["ودابا، واش كنتي عارف", "هاد المعلومة؟"],highlights:["واش كنتي عارف"]},
];
