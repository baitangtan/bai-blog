import { NextResponse } from "next/server";
import { Solar } from "lunar-javascript";

const GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const SIXTEEN_GONG_ORDER = [
  "子", "丑", "寅", "卯", "辰", "巳", "午", "未",
  "申", "酉", "戌", "亥", "中", "地丑", "地寅", "地亥",
];

const TAIYI_START_PALACE = "地亥";
const TIANYU_START_PALACE_INDEX = 0;

function ganZhiIndex(ganZhi: string): number {
  const gan = ganZhi.charAt(0);
  const zhi = ganZhi.charAt(1);
  const ganIdx = GAN.indexOf(gan);
  const zhiIdx = ZHI.indexOf(zhi);
  if (ganIdx < 0 || zhiIdx < 0) return -1;
  return (ganIdx * 12 + zhiIdx) % 60;
}

function getXunKong(dayGanZhi: string): string[] {
  const idx = ganZhiIndex(dayGanZhi);
  if (idx < 0) return [];
  const xunStart = idx % 10;
  const kongStart = (xunStart + 10 - idx % 12 + 12) % 12;
  return [ZHI[(10 - xunStart + 12) % 12], ZHI[(10 - xunStart + 1 + 12) % 12]];
}

function getYearJu(yearZhiIndex: number): { juName: string; juNumber: number } {
  const cycle = yearZhiIndex % 60;
  const juNumber = (cycle % 9) + 1;
  const juNames: Record<number, string> = {
    1: "太乙阳遁一局", 2: "太乙阳遁二局", 3: "太乙阳遁三局",
    4: "太乙阳遁四局", 5: "太乙阳遁五局", 6: "太乙阳遁六局",
    7: "太乙阳遁七局", 8: "太乙阳遁八局", 9: "太乙阳遁九局",
  };
  return { juName: juNames[juNumber] || "太乙阳遁一局", juNumber };
}

function getTaiyiPosition(yearZhiIndex: number): string {
  const pos = (yearZhiIndex + 15) % 16;
  return SIXTEEN_GONG_ORDER[pos] || "子";
}

function getTianmuPosition(yearZhiIndex: number): string {
  const pos = (yearZhiIndex + 1) % 12;
  return ZHI[pos] || "子";
}

function calculateSancai(taiyiPos: string, tianmuPos: string): string {
  const taiyiIdx = SIXTEEN_GONG_ORDER.indexOf(taiyiPos);
  const tianmuIdx = ZHI.indexOf(tianmuPos);
  if (taiyiIdx < 0 || tianmuIdx < 0) return "天、地、人三才未定";
  return `天${GAN[taiyiIdx % 10]}地${ZHI[tianmuIdx % 12]}人${GAN[(taiyiIdx + tianmuIdx) % 10]}`;
}

function calculateDingsuan(yearZhiIndex: number): number {
  return ((yearZhiIndex + 9) % 12) + 1;
}

function calculateZhusuan(dingsuan: number): number {
  return ((dingsuan - 1) % 9) + 1;
}

function calculateKesuan(yearZhiIndex: number): number {
  return ((yearZhiIndex + 3) % 9) + 1;
}

function getSixteenGongData(
  taiyiPos: string,
  tianmuPos: string,
  zhusuan: number,
  kesuan: number,
): Record<string, string[]> {
  const gongs: Record<string, string[]> = {};
  const bamenList = ["开", "休", "生", "伤", "杜", "景", "死", "惊"];
  const shenshaList = ["值符", "腾蛇", "太阴", "六合", "白虎", "玄武", "九地", "九天"];

  for (const gong of SIXTEEN_GONG_ORDER) {
    const gongIdx = SIXTEEN_GONG_ORDER.indexOf(gong);
    const bamenIdx = (gongIdx + zhusuan - 1) % 8;
    const shenshaIdx = (gongIdx + kesuan - 1) % 8;

    const zhuxing = gong === taiyiPos ? "太乙" : "";
    const feijiang = gong === tianmuPos ? "天目" : "";
    const shensha = shenshaList[shenshaIdx] || "";
    const bamen = bamenList[bamenIdx] || "";

    gongs[gong] = [zhuxing, feijiang, shensha, bamen];
  }
  return gongs;
}

function buildMarkdownGuaxiang(data: {
  yearGanZhi: string;
  monthGanZhi: string;
  dayGanZhi: string;
  hourGanZhi: string;
  xunKong: string[];
  juName: string;
  sancai: string;
  jiyuan: string;
  dingsuan: number;
  zhusuan: number;
  kesuan: number;
  sixteenGong: Record<string, string[]>;
}): string {
  let md = `## 太乙排盘\n\n`;
  md += `### 四柱干支\n`;
  md += `- 年柱: ${data.yearGanZhi}\n`;
  md += `- 月柱: ${data.monthGanZhi}\n`;
  md += `- 日柱: ${data.dayGanZhi}\n`;
  md += `- 时柱: ${data.hourGanZhi}\n`;
  md += `- 旬空: ${data.xunKong.join(", ")}\n\n`;
  md += `### 局数信息\n`;
  md += `- 局名: ${data.juName}\n`;
  md += `- 三才算: ${data.sancai}\n`;
  md += `- 纪元: ${data.jiyuan}\n`;
  md += `- 定算: ${data.dingsuan}\n`;
  md += `- 主算: ${data.zhusuan}\n`;
  md += `- 客算: ${data.kesuan}\n\n`;
  md += `### 十六宫\n`;
  for (const [gong, slots] of Object.entries(data.sixteenGong)) {
    const filled = slots.filter(Boolean);
    if (filled.length > 0) {
      md += `- ${gong}: ${filled.join(" ")}\n`;
    }
  }
  return md;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const timeStr = body.time;

    if (!timeStr) {
      return NextResponse.json(
        { error: "请输入占问时间" },
        { status: 400 },
      );
    }

    const parts = timeStr.split(/[-\s:]/);
    if (parts.length < 5) {
      return NextResponse.json(
        { error: "时间格式错误" },
        { status: 400 },
      );
    }

    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);
    const hour = parseInt(parts[3]);
    const minute = parseInt(parts[4]);
    const second = parts.length > 5 ? parseInt(parts[5]) : 0;

    const solar = Solar.fromYmdHms(year, month, day, hour, minute, second);
    const lunar = solar.getLunar();

    const yearGanZhi = lunar.getYearInGanZhi();
    const monthGanZhi = lunar.getMonthInGanZhi();
    const dayGanZhi = lunar.getDayInGanZhi();
    const hourGanZhi = lunar.getTimeInGanZhi();

    const xunKong = getXunKong(dayGanZhi);

    const yearZhiIndex = ZHI.indexOf(yearGanZhi.charAt(1));
    const { juName, juNumber } = getYearJu(yearZhiIndex);

    const taiyiPos = getTaiyiPosition(yearZhiIndex);
    const tianmuPos = getTianmuPosition(yearZhiIndex);

    const sancai = calculateSancai(taiyiPos, tianmuPos);
    const dingsuan = calculateDingsuan(yearZhiIndex);
    const zhusuan = calculateZhusuan(dingsuan);
    const kesuan = calculateKesuan(yearZhiIndex);

    const jiyuan = `上元${juNumber}局`;

    const sixteenGong = getSixteenGongData(taiyiPos, tianmuPos, zhusuan, kesuan);

    const paipanPayload = {
      "四柱干支": {
        "年柱": yearGanZhi,
        "月柱": monthGanZhi,
        "日柱": dayGanZhi,
        "时柱": hourGanZhi,
      },
      "旬空": xunKong,
      "局名": juName,
      "三才算": sancai,
      "纪元": jiyuan,
      "定算": dingsuan,
      "主算": zhusuan,
      "客算": kesuan,
      "十六宫": sixteenGong,
    };

    const markdownGuaxiang = buildMarkdownGuaxiang({
      yearGanZhi,
      monthGanZhi,
      dayGanZhi,
      hourGanZhi,
      xunKong,
      juName,
      sancai,
      jiyuan,
      dingsuan,
      zhusuan,
      kesuan,
      sixteenGong,
    });

    return NextResponse.json({
      paipan_payload: paipanPayload,
      markdown_guaxiang: markdownGuaxiang,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "太乙排盘计算失败";
    console.error("太乙排盘错误:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
